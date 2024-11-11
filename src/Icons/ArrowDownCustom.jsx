const ArrowDownCustom = ({ rotate }) => {
  const fillColor = "#abb3ca";
  return (
    <svg
      width="100pt"
      height="100pt"
      viewBox="0 0 100 100"
      className="ml-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: rotate ? "rotate(180deg)" : "none",
        transition: "transform 0.3s ease",
        marginLeft: "2px",
      }}
    >
      <defs>
        <clipPath id="a">
          <path d="m27 18.512h46v62.977h-46z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          d="m71.477 60.918c0.48047-0.39844 0.77344-0.98828 0.80078-1.6133 0.027344-0.62891-0.21094-1.2383-0.65234-1.6836-0.44531-0.44141-1.0547-0.67969-1.6836-0.65234-0.625 0.027344-1.2148 0.32031-1.6133 0.80078l-16.086 16.066v-53.102c-0.0625-1.1914-1.0469-2.1211-2.2383-2.1211s-2.1758 0.92969-2.2383 2.1211v53.102l-16.066-16.09c-0.88281-0.83984-2.2695-0.83984-3.1484 0-0.41797 0.41797-0.65234 0.98438-0.65234 1.5742 0 0.58984 0.23437 1.1562 0.65234 1.5742l19.902 19.902h-0.003906c0.41406 0.42578 0.98047 0.66797 1.5742 0.66797 0.59766 0 1.1641-0.24219 1.5781-0.66797z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

export default ArrowDownCustom;
