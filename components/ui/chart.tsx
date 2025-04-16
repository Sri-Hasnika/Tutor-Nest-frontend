"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    differences?: {
      [key: string]: any // specific customizations for differences
    }
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

// ChartStyle component with safeguard for null config
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  if (!config) return null

  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  )

  const differenceConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.differences
  )

  if (!colorConfig.length && !differenceConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: [
          ...Object.entries(THEMES).map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          ),
          ...differenceConfig.map(
            ([key, itemConfig]) => `
[data-chart=${id}] {
${Object.entries(itemConfig.differences || {}).map(
  ([diffKey, diffValue]) => `  --difference-${diffKey}: ${diffValue};`
).join("\n")}
}
`
          ),
        ].join("\n"),
      }}
    />
  )
}

// --- Missing Components Definitions ---

// ChartBars acts as a container for the chart bars.
const ChartBars: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="chart-bars flex gap-2">{children}</div>
}

// ChartBar renders an individual bar.
// This is a simple placeholder implementation.
interface ChartBarProps {
  value: number
  label: string
  className?: string
}
const ChartBar: React.FC<ChartBarProps> = ({ value, label, className }) => {
  // For demonstration, we'll render a simple bar as a div.
  // You can replace this with a more complex SVG or Recharts component.
  return (
    <div className={`chart-bar ${className} flex flex-col items-center`}>
      <div
        className="bar"
        style={{
          height: `${value / 10}px`,
          width: "20px",
          backgroundColor: "currentColor",
        }}
      />
      <span className="label text-xs mt-1">{label}</span>
    </div>
  )
}

// ChartXAxis renders a simple X axis.
const ChartXAxis: React.FC = () => {
  return <div className="chart-x-axis text-center mt-2">X Axis</div>
}

// ChartYAxis renders a simple Y axis.
const ChartYAxis: React.FC = () => {
  return <div className="chart-y-axis text-center mb-2">Y Axis</div>
}

// The ChartTooltip from Recharts is re-exported.
const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = key in config ? config[key] : undefined
      const value =
        !labelKey && typeof label === "string"
          ? itemConfig?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) return null

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${labelKey || item.dataKey || item.name || index}`
            const itemConfig = key in config ? config[key] : undefined

            return (
              <div key={key} className="flex gap-1.5">
                {!hideIndicator && (
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full")}
                    style={{ backgroundColor: itemConfig?.color || color }}
                  />
                )}
                <div className="text-sm font-medium">{itemConfig?.label}</div>
                {formatter &&
                  item.value !== undefined &&
                  item.value !== null && (
                    <div className="text-xs">
                      {formatter(item.value, item, index)}
                    </div>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  ChartBars,
  ChartBar,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  ChartStyle,
}
