/* eslint-disable react/prop-types */
import { SuppressedIcon } from "./Icons/Suppressed";
import StarRating from "./StarRating";
import Flag from "react-world-flags";

const styles = {
  card: {
    width: "220px",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    backgroundColor: "#EBF4FC",
  },
  container: {
    padding: "0.5rem",
    fontFamily: "Poppins",
  },
  title: {
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "0.75rem",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 5px", // Creates vertical gap between rows
  },
  label: {
    fontSize: "10px",
    color: "#4B5563",
    textAlign: "left",
    paddingRight: "10px",
    verticalAlign: "top",
  },
  value: {
    fontSize: "10px",
    fontWeight: "500",
    textAlign: "left",
    verticalAlign: "top",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    marginTop: "-3px",
  },
  flagContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  flag: {
    width: "1rem",
    height: "1rem",
  },
};

export function BBCard({ bb_data, total_sellers }) {
  const price = bb_data?.price ? `$${bb_data?.price}` : "Unavailable";
  const seller = bb_data?.seller_name || "Unavailable";
  const offerType =
    bb_data?.category === "wlmt"
      ? "WMT"
      : bb_data?.category
      ? bb_data?.category.toUpperCase()
      : "Unavailable";
  const rating = bb_data?.rating;
  const totalReviews = bb_data?.total_reviews;
  const country = bb_data?.country || "Unavailable";

  const walmartFlag = seller?.toLowerCase() === "walmart.com";

  let sellerReviewsRowContent = "";
  let sellerOriginRowContent = "";

  if (walmartFlag) {
    sellerOriginRowContent = (
      <tr>
        <td style={styles.label}>Seller Origin</td>
      </tr>
    );
  } else {
    sellerOriginRowContent = (
      <tr>
        <td style={styles.label}>Seller Origin</td>
        <td style={styles.value}>
          <div style={styles.flagContainer}>
            <Flag code={country} style={styles.flag} alt={`${country} Flag`} />
            <span>{country}</span>
          </div>
        </td>
      </tr>
    );
  }

  if (walmartFlag) {
    sellerReviewsRowContent = (
      <tr>
        <td style={styles.label}>Seller Reviews</td>
      </tr>
    );
  } else if (rating && totalReviews) {
    sellerReviewsRowContent = (
      <tr>
        <td style={styles.label}>Seller Reviews</td>
        <td style={styles.value}>
          <div style={styles.ratingContainer}>
            <StarRating rating={rating} size={14} />
            <div>{totalReviews}</div>
          </div>
        </td>
      </tr>
    );
  } else if (totalReviews === 0) {
    sellerReviewsRowContent = (
      <tr>
        <td style={styles.label}>Seller Reviews</td>
        <td style={styles.value}>
          <div style={styles.ratingContainer}>
            <div>No Reviews</div>
          </div>
        </td>
      </tr>
    );
  } else if (totalReviews === "") {
    sellerReviewsRowContent = (
      <tr>
        <td style={styles.label}>Seller Reviews</td>
        <td style={styles.value}>
          <div style={styles.ratingContainer}>
            <div>Unavailable</div>
          </div>
        </td>
      </tr>
    );
  }

  let mainContent = "";

  // //Suppressed or Out of Stock
  // mainContent = (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       fontFamily: "Poppins",
  //       fontSize: "10px",
  //       fontWeight: "600",
  //       marginBottom: "5px",
  //       textAlign:"center"
  //     }}
  //   >
  //     <SuppressedIcon />
  //     <h3>Currently, the Buy Box is Suppressed</h3>
  //   </div>
  // );

  //Normal
  mainContent = (
    <table style={styles.table}>
      <tbody>
        <tr>
          <td style={styles.label}>BB Price</td>
          <td style={styles.value}>{`${price}`}</td>
        </tr>
        <tr>
          <td style={styles.label}>BB Seller</td>
          <td style={styles.value}>{seller}</td>
        </tr>
        <tr>
          <td style={styles.label}>Offer Type</td>
          <td style={styles.value}>{offerType}</td>
        </tr>
        {sellerOriginRowContent}
        {sellerReviewsRowContent}
      </tbody>
    </table>
  );

  return (
    <div style={styles.card}>
      <div style={styles.container}>
        <div style={styles.title}>Current BB Info</div>
        {mainContent}
      </div>
    </div>
  );
}
