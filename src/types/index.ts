export type organizationType = {
    id: string,
    name: string,
    slug: string,
    logo?: string,
    createdAt: string,
}

export type avatarType = {
    id: string,
    name: string,
    displayName: string,
    variantName: string,
    provider: string,
    providerId: string,
    imageUrl?: string | null,
    gender?: string,
    status?: string,
    createdAt: Date,
    updatedAt: Date,
}
