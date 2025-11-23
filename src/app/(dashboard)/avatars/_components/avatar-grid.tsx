import Image from "next/image";
import { Copy, Dices } from "lucide-react";
import { avatarType } from "@/types";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";


export function AvatarGrid({ avatars }: { avatars: avatarType[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {avatars.length > 0 ? avatars.map((avatar) => (
                <Card
                    key={avatar.id}
                    className="rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all pt-0!"
                >
                    <div className="aspect-video relative w-full">
                        {avatar.imageUrl &&
                            <Image
                                src={avatar.imageUrl}
                                alt={avatar.name}
                                fill
                                className="object-cover"
                            />}
                    </div>
                    <CardHeader className="pb-0! flex items-center justify-between"><div>

                        <CardTitle className="text-lg">{avatar.displayName}</CardTitle>
                        {avatar.name && <CardDescription>{avatar.variantName}</CardDescription>}
                    </div>
                        <div>
                            {avatar.gender && <Badge className="capitalize">{avatar.gender}</Badge>}
                            {avatar.createdAt && <p className="capitalize text-sm text-muted-foreground mt-2">{formatDate(avatar.createdAt)}</p>}

                        </div>
                    </CardHeader>
                </Card>
            )) :
                <div className="flex items-center justify-center col-span-4">
                    <Empty>
                        <EmptyHeader>
                            <Dices className="w-10 h-10" />
                            <EmptyTitle>No avatars found</EmptyTitle>
                            <EmptyDescription>No avatars found</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            }
        </div>
    );
}
