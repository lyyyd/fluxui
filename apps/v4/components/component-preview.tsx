import * as React from "react"
import Image from "next/image"
import { registryItemFileSchema } from "shadcn/schema"
import { z } from "zod"

import { highlightCode } from "@/lib/highlight-code"
import {
  createFileTreeForRegistryItemFiles,
  getRegistryItem,
} from "@/lib/registry"
import { cn } from "@/lib/utils"
import { BlockViewer } from "@/components/block-viewer"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"
import { type Style } from "@/registry/styles"

export async function ComponentPreview({
  name,
  styleName = "new-york-v4",
  type,
  className,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  withBlockViewer = true,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  styleName?: Style["name"]
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
  withBlockViewer?: boolean
}) {
  const Component = Index[styleName]?.[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <Image
          src={`/r/styles/new-york-v4/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/new-york-v4/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${styleName}/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  if (withBlockViewer) {
    const item = await getCachedRegistryItem(name, styleName)

    if (!item?.files) {
      return (
        <ComponentPreviewTabs
          className={className}
          align={align}
          hideCode={hideCode}
          component={<Component />}
          source={
            <ComponentSource
              name={name}
              collapsible={false}
              styleName={styleName}
            />
          }
          chromeLessOnMobile={chromeLessOnMobile}
          {...props}
        />
      )
    }

    const [tree, highlightedFiles] = await Promise.all([
      getCachedFileTree(item.files),
      getCachedHighlightedFiles(item.files),
    ])

    return (
      <BlockViewer
        item={item}
        tree={tree}
        highlightedFiles={highlightedFiles}
        styleName={styleName}
      >
        <ComponentPreviewTabs
          className={cn(
            "my-0 **:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0",
            item.meta?.containerClassName,
            className
          )}
          align={align}
          hideCode
          component={<Component />}
          source={
            <ComponentSource
              name={name}
              collapsible={false}
              styleName={styleName}
            />
          }
          chromeLessOnMobile={chromeLessOnMobile}
          {...props}
        />
      </BlockViewer>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          styleName={styleName}
        />
      }
      chromeLessOnMobile={chromeLessOnMobile}
      {...props}
    />
  )
}

const getCachedRegistryItem = React.cache(
  async (name: string, styleName: Style["name"]) => {
    return await getRegistryItem(name, styleName)
  }
)

const getCachedFileTree = React.cache(
  async (files: Array<{ path: string; target?: string }>) => {
    if (!files) {
      return null
    }

    return await createFileTreeForRegistryItemFiles(files)
  }
)

const getCachedHighlightedFiles = React.cache(
  async (files: z.infer<typeof registryItemFileSchema>[]) => {
    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        highlightedContent: await highlightCode(file.content ?? ""),
      }))
    )
  }
)
