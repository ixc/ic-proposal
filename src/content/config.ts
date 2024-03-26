import {z, defineCollection} from "astro:content"

const sectionCollection = defineCollection({
    type: 'content',
    schema: z.object({
      section: z.string(),
      order: z.number(),
      headers: z.array(z.string())
    })
});


export const collections = {
    sections: sectionCollection,
}
