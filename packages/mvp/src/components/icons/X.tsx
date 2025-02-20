interface XIconProps {
  color: "primary" | "white"
  width: string
  height: string
}

const XIcon = ({ width, height, color }: XIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 15" fill="none">
      <g clipPath="url(#clip0_138_3505)">
        <path
          d="M8.29197 6.37605L13.3474 0.45105H12.1494L7.75979 5.59564L4.25378 0.45105H0.210022L5.51179 8.23059L0.210022 14.4439H1.40807L6.04366 9.01099L9.74626 14.4439H13.79L8.29167 6.37605H8.29197ZM6.65107 8.29913L6.11389 7.52446L1.83975 1.36036H3.67988L7.12917 6.33499L7.66635 7.10965L12.15 13.5759H10.3099L6.65107 8.29942V8.29913Z"
          fill={color == "primary" ? "#16A34A" : "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_138_3505">
          <rect width={width} height={height} fill="white" transform="translate(0.210022 0.45105)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default XIcon
