declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (data: CollectionEntry<C>) => boolean
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"about": {
"about.md": {
  id: "about.md",
  slug: "about",
  body: string,
  collection: "about",
  data: any
},
},
"explanation": {
"explanation.md": {
  id: "explanation.md",
  slug: "explanation",
  body: string,
  collection: "explanation",
  data: any
},
},
"infos-complementaires": {
"infos-complementaires.md": {
  id: "infos-complementaires.md",
  slug: "infos-complementaires",
  body: string,
  collection: "infos-complementaires",
  data: any
},
},
"mentions-legales": {
"CGV.md": {
  id: "CGV.md",
  slug: "cgv",
  body: string,
  collection: "mentions-legales",
  data: any
},
"site-web.md": {
  id: "site-web.md",
  slug: "site-web",
  body: string,
  collection: "mentions-legales",
  data: any
},
},
"services": {
"bigCard1.md": {
  id: "bigCard1.md",
  slug: "bigcard1",
  body: string,
  collection: "services",
  data: any
},
"bigCard2.md": {
  id: "bigCard2.md",
  slug: "bigcard2",
  body: string,
  collection: "services",
  data: any
},
"card1.md": {
  id: "card1.md",
  slug: "card1",
  body: string,
  collection: "services",
  data: any
},
"card2.md": {
  id: "card2.md",
  slug: "card2",
  body: string,
  collection: "services",
  data: any
},
"services-intro.md": {
  id: "services-intro.md",
  slug: "services-intro",
  body: string,
  collection: "services",
  data: any
},
},
"zone-intervention": {
"zone-intervention.md": {
  id: "zone-intervention.md",
  slug: "zone-intervention",
  body: string,
  collection: "zone-intervention",
  data: any
},
},

	};

	type ContentConfig = never;
}
