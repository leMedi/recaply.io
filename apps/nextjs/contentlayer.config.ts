import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

const estimateReadingTimeMinutes = (text: string) => {
	const wordsPerMinute = 200;
	const noOfWords = text.split(/\s/g).length;
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes);
	return `${readTime} min read`;
};

export const Post = defineDocumentType(() => ({
	name: "Post",
	contentType: "mdx",
	filePathPattern: "./posts/*.mdx",
	fields: {
		title: { type: "string", required: true },
		description: { type: "string" },
		date: { type: "date", required: true },
		published: { type: "boolean", default: true },
		image: { type: "string", required: true },
	},
	computedFields: {
		readingTime: {
			type: "string",
			resolve: (doc) => estimateReadingTimeMinutes(doc.body.raw),
		},
		url: {
			type: "string",
			resolve: (post) => `/blog/${post._raw.flattenedPath.split("/").pop()}`,
		},
	},
}));

export default makeSource({
	contentDirPath: "content",
	documentTypes: [Post],
	mdx: {
		remarkPlugins: [remarkGfm],
	},
});
