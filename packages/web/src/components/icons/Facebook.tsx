interface FacebookIconProps {
  color: "primary" | "white"
  width: string
  height: string
}
const FacebookIcon = ({ width, height, color }: FacebookIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group">
        <path
          id="Vector"
          d="M9.79004 1.95105C5.64779 1.95105 2.29004 5.3088 2.29004 9.45105C2.29004 13.1943 5.03279 16.297 8.61854 16.8603V11.6186H6.71354V9.45105H8.61854V7.7988C8.61854 5.9193 9.73754 4.8813 11.4513 4.8813C12.2718 4.8813 13.1298 5.02755 13.1298 5.02755V6.87255H12.1848C11.2525 6.87255 10.9623 7.4508 10.9623 8.04405V9.45105H13.042L12.7098 11.6186H10.9623V16.8603C14.5473 16.2978 17.29 13.1936 17.29 9.45105C17.29 5.3088 13.9323 1.95105 9.79004 1.95105Z"
          fill={color == "primary" ? "#16A34A" : "#FFFFFF"}
        />
      </g>
    </svg>
  )
}

export default FacebookIcon
