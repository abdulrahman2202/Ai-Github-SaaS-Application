import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import pLimit from "p-limit";
import { db } from "@/server/db";

export const loadGithubRepo = async (githubUrl:string, githubToken ?: string) => {
    const loader = new GithubRepoLoader(githubUrl,{
        accessToken: githubToken || '',
        branch: 'main',
        ignoreFiles: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })
    const docs = await loader.load()
    return docs

}