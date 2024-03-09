import { useState } from "react"
import classnames from "classnames"

interface TabsProps {
  data: {
    title: string
    element: JSX.Element
  }[]
}

const Tabs = ({ data }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <div className="flex mb-6">
        {data.map((tab, index) => (
          <div
            className={classnames("py-3 px-5 cursor-pointer", {
              "border-b-2 border-primary": activeTab == index,
              "border-b": activeTab != index
            })}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className=" min-h-24">{data?.[activeTab].element}</div>
    </>
  )
}

export default Tabs
