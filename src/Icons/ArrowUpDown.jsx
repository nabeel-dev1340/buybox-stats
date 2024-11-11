export function ArrowUpDownCustom({ fillColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      version="1.1"
      viewBox="0 0 100 100"
      style={{marginLeft:"3px",marginTop:"2px"}}
    >
      <path d="m32 10v50.898h-20.699l33 29.102v-80z" fill={fillColor} />
      <path d="m68 90v-50.898h20.699l-33-29.102v80z" fill={fillColor} />
    </svg>
  );
}
