import {z, defineCollection} from "astro:content"

const sectionCollection = defineCollection({
    type: 'content',
    schema: z.object({
      section: z.string(),
      page: z.number(),
    })
});

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    page: z.number(),
    name: z.string(),
    image: z.string(),
  })
});


export const collections = {
    sections: sectionCollection,
    team: teamCollection,
}
