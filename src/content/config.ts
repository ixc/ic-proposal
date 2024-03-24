import {z, defineCollection} from "astro:content"

const memberCollection = defineCollection({
    schema: ({image}) =>
        z.object({
            name: z.string(),
            image: image(),
        }),
})


export const collections = {
    member: memberCollection,
}
