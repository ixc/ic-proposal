import {z, defineCollection} from "astro:content"

const sectionCollection = defineCollection({
    type: 'content',
    schema: z.object({
      section: z.string(),
      page: z.number(),
    })
});


export const collections = {
    sections: sectionCollection,
}
