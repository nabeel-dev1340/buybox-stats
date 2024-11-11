import { Pie, PieChart } from "recharts";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TimeRangeSelect } from "./TimeframeSelector";
import ExpandIcon from "./Icons/ExpandIcon";
import { BetaBadge } from "./BetaBadge";
import { X } from "lucide-react";
import { generateUniqueColors } from "./lib/utils";
import { SellersTable } from "./SellersTable";
import { BBCard } from "./BBCard";

// Mock sellers array
let sellers = [];

let bb_seller_data = {};

// const sellerData = [
//   {
//     sellerName: "YUKISUNSHINE",
//     percent: 71.05,
//     id: "A72264E1450A4D14AC2A159E229CD",
//     avg_price: 31.9,
//     lastWon: "08/18/2024",
//     qty: 12,
//     pro_seller: "",
//     current_price: 90.0,
//     buybox_winner: false,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(0, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_TWO",
//     percent: 65.3,
//     id: "B72264E1450A4D14AC2A159E229CD",
//     avg_price: 25.5,
//     lastWon: "09/01/2024",
//     qty: 12,
//     pro_seller: "",
//     current_price: 89.0,
//     buybox_winner: false,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(30, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_THREE",
//     percent: 59.2,
//     id: "C72264E1450A4D14AC2A159E229CD",
//     avg_price: 28.7,
//     lastWon: "07/15/2024",
//     qty: 23,
//     pro_seller: "",
//     current_price: 6.7,
//     buybox_winner: true,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(60, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_FOUR",
//     percent: 75.8,
//     id: "D72264E1450A4D14AC2A159E229CD",
//     avg_price: 34.1,
//     lastWon: "06/20/2024",
//     qty: 23,
//     pro_seller: "",
//     current_price: 67.8,
//     buybox_winner: false,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(90, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_FIVE",
//     percent: 52.7,
//     id: "E72264E1450A4D14AC2A159E229CD",
//     avg_price: 29.3,
//     lastWon: "08/05/2024",
//     qty: 67,
//     pro_seller: "",
//     current_price: 56.7,
//     buybox_winner: true,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(120, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_SIX",
//     percent: 68.4,
//     id: "F72264E1450A4D14AC2A159E229CD",
//     avg_price: 30.9,
//     lastWon: "07/25/2024",
//     qty: 78,
//     pro_seller: "",
//     current_price: 45.5,
//     buybox_winner: false,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(150, 70%, 60%)",
//   },
//   {
//     sellerName: "SELLER_SEVEN",
//     percent: 74.6,
//     id: "G72264E1450A4D14AC2A159E229CD",
//     avg_price: 33.7,
//     lastWon: "09/10/2024",
//     qty: 6.7,
//     pro_seller: "",
//     current_price: "",
//     buybox_winner: true,
//     catalogSellerId: "",
//     sellerCategory: "",
//     fill: "hsl(180, 70%, 60%)",
//   },
// ];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
};

const valueMap = {
  "30-d": 30,
  "60-d": 60,
  "90-d": 90,
  "180-d": 180,
  "1-y": 365,
  all: -1,
};

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[120px] right-[600px] z-50">
      <div
        className="flex flex-col items-center bg-white rounded-[12px] relative border border-slate-200"
        style={{
          width: "850px",
          paddingTop: "10px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <button
          onClick={onClose}
          style={{ marginRight: "10px" }}
          className="self-end text-gray-500 hover:text-gray-700 mr-[10px]"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ChartComponent = ({ isExpanded = false, onExpand }) => {
  const [selectedOption, setSelectedOption] = useState("30-d");
  const [filteredData, setFilteredData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false); // Track data load state

  // Main chart useEffect
  useEffect(() => {
    // API call whenever selectedOption changes
    chrome.storage.local.get(["id_token"]).then((result) => {
      const id_token = result.id_token;
      const post_url = `${
        document.getElementById("base_api_url").value
      }/walmart/buybox_stats`;
      const post_data = {
        product_id: document.getElementById("item_code").innerText,
        buybox_selected_time: valueMap[selectedOption], // Use the selectedOption value from valueMap
      };

      fetch(post_url, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${id_token}`,
        },
        method: "POST",
        body: JSON.stringify(post_data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data?.chart_data?.length > 0) {
            const chart_data = data["chart_data"];
            const colors = generateUniqueColors(data["chart_data"].length);

            const buy_box_seller_name = document.getElementById(
              "buy_box_seller_name"
            ).value;
            bb_seller_data["seller_name"] = buy_box_seller_name;
            let sellers_obj = {};
            for (let i = 0; i < sellers.length; i++) {
              let seller_id = sellers[i]["seller_id"];
              sellers_obj[seller_id] = sellers[i];
            }
            for (let i = 0; i < chart_data.length; i++) {
              let quantity = "";
              let pro_seller = "";
              let current_price = "";
              let catalogSellerId = "";
              let sellerCategory = "";
              if (typeof sellers_obj[chart_data[i]["id"]] !== "undefined") {
                quantity = sellers_obj[chart_data[i]["id"]]["quantity"];
                pro_seller =
                  sellers_obj[chart_data[i]["id"]]["pro_seller"] || false;
                current_price = sellers_obj[chart_data[i]["id"]]["price"];
                catalogSellerId =
                  sellers_obj[chart_data[i]["id"]]["catalog_seller_id"];
                sellerCategory =
                  sellers_obj[chart_data[i]["id"]]["seller_category"];
              }
              let buybox_winner =
                chart_data[i]["sellerName"] === buy_box_seller_name;
              chart_data[i] = {
                ...chart_data[i],
                qty: quantity ? quantity : 0,
                pro_seller: pro_seller,
                current_price: current_price,
                buybox_winner: buybox_winner,
                catalogSellerId: catalogSellerId,
                sellerCategory: sellerCategory,
                fill: colors[i],
              };
            }
            setFilteredData(chart_data);
            setIsDataReady(true);
          } else {
            setFilteredData([]);
          }
        });
    });
  }, [selectedOption]);

  const chartHeight = isExpanded ? "400px" : "250px";

  return (
    <Card style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1rem",
          marginRight: "1rem",
          marginLeft: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <h3
            style={{
              fontWeight: "600",
              lineHeight: "1",
              letterSpacing: "-0.015em",
              fontSize: "16px",
              marginBottom: "3px",
              fontFamily: "Poppins",
            }}
          >
            BuyBox Statistics
          </h3>
          <BetaBadge />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <TimeRangeSelect
            selectedOption={selectedOption}
            onOptionChange={setSelectedOption}
          />

          {!isExpanded && (
            <button
              onClick={onExpand}
              size="sm"
              style={{
                padding: "5px",
                borderRadius: "0.5rem",
                border: "1px solid rgb(203, 213, 225)", // border-slate-300 equivalent
              }}
              id="buybox-chart-modal"
            >
              <ExpandIcon size={17} />
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "12px",
          marginLeft: "-27px",
          paddingBottom: "0px",
        }}
      >
        <div>
          <ChartContainer
            config={chartConfig}
            style={{
              margin: "0 0",
              aspectRatio: "1 / 1",
              width: isExpanded ? "312px" : "240px",
              maxHeight: chartHeight,
            }}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={filteredData}
                dataKey="percent"
                nameKey="sellerName"
                stroke="0"
              />
            </PieChart>
          </ChartContainer>
        </div>
        {isDataReady && (
          <BBCard
            bb_data={bb_seller_data}
            total_sellers={filteredData.length}
          />
        )}
      </div>
      <SellersTable sellersData={filteredData} />
    </Card>
  );
};

export function BuyboxChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     // Fetch token and make API call
  //     chrome.storage.local.get(["id_token"]).then((result) => {
  //       const id_token = result.id_token;
  //       const baseApiUrlElement = document.getElementById("base_api_url");
  //       const itemCodeElement = document.getElementById("item_code");

  //       // Ensure elements exist
  //       if (baseApiUrlElement && itemCodeElement) {
  //         const post_url = `${baseApiUrlElement.value}/walmart/buybox_stats`;
  //         const post_data = {
  //           product_id: itemCodeElement.innerText,
  //           buybox_selected_time: valueMap[modalSelectedOption], // Use the modalSelectedOption value from valueMap
  //         };

  //         fetch(post_url, {
  //           headers: {
  //             accept: "*/*",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${id_token}`,
  //           },
  //           method: "POST",
  //           body: JSON.stringify(post_data),
  //         })
  //           .then((response) => {
  //             if (!response.ok) {
  //               throw new Error(`HTTP error! status: ${response.status}`);
  //             }
  //             return response.json();
  //           })
  //           .then((data) => {
  //             if (data && data.chart_data && data.chart_data.length > 0) {
  //               const chart_data = data.chart_data;
  //               const colors = generateUniqueColors(chart_data.length);
  //               const buy_box_seller_name = document.getElementById(
  //                 "buy_box_seller_name"
  //               ).value;

  //               // Create a sellers object for easy lookup
  //               const sellers_obj = sellers.reduce((obj, seller) => {
  //                 obj[seller.seller_id] = seller;
  //                 return obj;
  //               }, {});

  //               // Map over chart data and augment with seller info
  //               const updatedChartData = chart_data.map((item) => {
  //                 const sellerData = sellers_obj[item.id] || {};
  //                 return {
  //                   ...item,
  //                   qty: sellerData.quantity || "",
  //                   pro_seller: sellerData.pro_seller || false,
  //                   current_price: sellerData.price || "",
  //                   buybox_winner: item.sellerName === buy_box_seller_name,
  //                   catalogSellerId: sellerData.catalog_seller_id || "",
  //                   sellerCategory: sellerData.seller_category || "",
  //                   fill: colors[chart_data.indexOf(item)], // Ensure proper index for colors
  //                 };
  //               });

  //               setModalFilteredData(updatedChartData);
  //             } else {
  //               setModalFilteredData([]);
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Fetch error:", error);
  //             setModalFilteredData([]); // Handle errors gracefully
  //           });
  //       }
  //     });
  //   }
  // }, [modalSelectedOption, isModalOpen]);

  return (
    <>
      <ChartComponent onExpand={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChartComponent isExpanded={true} />
      </Modal>
    </>
  );
}
