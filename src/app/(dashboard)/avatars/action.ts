"use server"

import { db } from "@/drizzle/db";
import { avatar } from "@/drizzle/schema";
import { ANAM_AI_BASE_API_URL, STATUS } from "@/lib/constant";
import { and, eq, ilike, sql } from "drizzle-orm";
import z from "zod";
import { createAgent, providerStrategy } from "langchain";
import { model } from "@/langchain/azure-open-ai";

export const getAllAvatars = async ({
    page = 1,
    perPage = 10,
    search = "",
}: {
    page?: number;
    perPage?: number;
    search?: string;
}) => {
    const skip = (page - 1) * perPage;

    const data = await db.query.avatar.findMany({
        where: and(ilike(avatar.name, `%${search}%`), eq(avatar.status, STATUS.PUBLISHED)),
        limit: perPage,
        offset: skip,
    });

    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(avatar)
        .where(and(ilike(avatar.name, `%${search}%`), eq(avatar.status, STATUS.PUBLISHED)));

    const count = countResult[0].count;
    const finalData = {
        "meta": {
            "total": count,
            "lastPage": Math.ceil(count / perPage),
            "currentPage": page,
            "perPage": perPage,
            "prev": page > 1 ? page - 1 : null,
            "next": page < Math.ceil(count / perPage) ? page + 1 : null
        },
        "data": data
    }

    return finalData;
}


const avatarSchema = z.object({
    avatars: z.array(z.object({
        displayName: z.string(),
        name: z.string(),
        variantName: z.string(),
        providerId: z.string(),
        imageUrl: z.string(),
        gender: z.string().min(2),
        provider: z.string(),
    }))
});


export const syncAvatars = async () => {
    try {
        let allAvatars: { id: string; displayName: string; variantName: string; imageUrl: string; createdAt: string; updatedAt: string }[] = [];
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await fetch(`${ANAM_AI_BASE_API_URL}/avatars?page=${currentPage}&perPage=100`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.ANAM_AI_API_KEY}`,
                },
            });

            if (!response.ok) {
                console.error(`Failed to fetch avatars on page ${currentPage}: ${response.statusText}`);
                break;
            }

            const data = await response.json();

            if (data && Array.isArray(data.data)) {
                allAvatars = allAvatars.concat(data.data);
                if (data.meta && data.meta.next !== null) {
                    currentPage++;
                } else {
                    hasNextPage = false;
                }
            } else {
                console.error("Invalid data structure received:", data);
                break;
            }
        }

        const agent = createAgent({
            model: model,
            responseFormat: providerStrategy(avatarSchema)
        })

        const result = await agent.invoke({
            messages: [{ "role": "user", "content": `Parse this array of avatars and extract the following fields for each: displayName, name, variantName, provider, providerId, imageUrl, and gender. all of data is required guess the geneder by name and  Return as an array here is inputs.\n\n${JSON.stringify(allAvatars)}` }]
        });

        console.log(result.structuredResponse);
        await db.insert(avatar).values(result.structuredResponse.avatars);
        return true

    } catch (error) {
        console.error(error);
        return false
    }
}
