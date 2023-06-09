declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// This needs to be in sync with ImageMetadata
	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

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
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"about": {
"about.md": {
  id: "about.md",
  slug: "about",
  body: string,
  collection: "about",
  data: any
} & { render(): Render[".md"] },
},
"explanation": {
"explanation.md": {
  id: "explanation.md",
  slug: "explanation",
  body: string,
  collection: "explanation",
  data: any
} & { render(): Render[".md"] },
},
"infos-complementaires": {
"infos-complementaires.md": {
  id: "infos-complementaires.md",
  slug: "infos-complementaires",
  body: string,
  collection: "infos-complementaires",
  data: any
} & { render(): Render[".md"] },
},
"mentions-legales": {
"CGV.md": {
  id: "CGV.md",
  slug: "cgv",
  body: string,
  collection: "mentions-legales",
  data: any
} & { render(): Render[".md"] },
"site-web.md": {
  id: "site-web.md",
  slug: "site-web",
  body: string,
  collection: "mentions-legales",
  data: any
} & { render(): Render[".md"] },
},
"services": {
"bigCard1.md": {
  id: "bigCard1.md",
  slug: "bigcard1",
  body: string,
  collection: "services",
  data: any
} & { render(): Render[".md"] },
"bigCard2.md": {
  id: "bigCard2.md",
  slug: "bigcard2",
  body: string,
  collection: "services",
  data: any
} & { render(): Render[".md"] },
"card1.md": {
  id: "card1.md",
  slug: "card1",
  body: string,
  collection: "services",
  data: any
} & { render(): Render[".md"] },
"card2.md": {
  id: "card2.md",
  slug: "card2",
  body: string,
  collection: "services",
  data: any
} & { render(): Render[".md"] },
"services-intro.md": {
  id: "services-intro.md",
  slug: "services-intro",
  body: string,
  collection: "services",
  data: any
} & { render(): Render[".md"] },
},
"zone-intervention": {
"zone-intervention.md": {
  id: "zone-intervention.md",
  slug: "zone-intervention",
  body: string,
  collection: "zone-intervention",
  data: any
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = never;
}
