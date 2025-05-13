"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MapIcon, LayersIcon } from "lucide-react";

// Define Tunisia's governorates with their coordinates (approximate centers for SVG)
const governorates = {
  g_Tunis: { name: "Tunis", x: 340, y: 160 },
  g_Ariana: { name: "Ariana", x: 330, y: 140 },
  g_Ben_Arous: { name: "Ben Arous", x: 350, y: 180 },
  g_Manouba: { name: "Manouba", x: 310, y: 160 },
  g_Beja: { name: "Béja", x: 240, y: 195 },
  g_Nabeul: { name: "Nabeul", x: 390, y: 170 },
  g_Bizerte: { name: "Bizerte", x: 280, y: 130 },
  g_Jendouba: { name: "Jendouba", x: 220, y: 170 },
  g_Kef: { name: "Kef", x: 220, y: 250 },
  g_Seliana: { name: "Seliana", x: 260, y: 250 },
  g_Sousse: { name: "Sousse", x: 405, y: 275 },
  g_Monastir: { name: "Monastir", x: 410, y: 310 },
  g_Mahdia: { name: "Mahdia", x: 395, y: 330 },
  g_Sfax: { name: "Sfax", x: 350, y: 380 },
  g_Kairouan: { name: "Kairouan", x: 300, y: 280 },
  g_Kasserine: { name: "Kasserine", x: 240, y: 310 },
  g_SidiBouzid: { name: "Sidi Bouzid", x: 280, y: 300 },
  g_Gabes: { name: "Gabes", x: 330, y: 420 },
  g_Mednine: { name: "Medenine", x: 360, y: 460 },
  g_Tataouin: { name: "Tataouine", x: 290, y: 480 },
  g_Gafsa: { name: "Gafsa", x: 230, y: 350 },
  g_Tozer: { name: "Tozeur", x: 200, y: 380 },
  g_Kebili: { name: "Kebili", x: 270, y: 400 },
  g_Zaghouan: { name: "Zaghouan", x: 310, y: 240 },
};

// Generate random farm locations across Tunisia
const generateFarms = (count) => {
  const farms = [];
  // Define the boundaries of Tunisia on our SVG
  const minX = 200;
  const maxX = 370;
  const minY = 150;
  const maxY = 450;

  // Areas with higher concentration of farms (agricultural regions)
  const agriculturalHotspots = [
    { x: 250, y: 140, radius: 50 }, // Béja region
    { x: 260, y: 280, radius: 60 }, // Sidi Bouzid region
    { x: 300, y: 250, radius: 40 }, // Kairouan region
    { x: 380, y: 150, radius: 40 }, // Nabeul region
    { x: 220, y: 320, radius: 50 }, // Gafsa region
  ];

  for (let i = 0; i < count; i++) {
    // Decide if this farm should be in a hotspot (70% chance)
    const inHotspot = Math.random() < 0.7;

    let x, y;

    if (inHotspot) {
      // Pick a random hotspot
      const hotspot =
        agriculturalHotspots[
          Math.floor(Math.random() * agriculturalHotspots.length)
        ];

      // Generate a point within the hotspot's radius
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * hotspot.radius;
      x = hotspot.x + Math.cos(angle) * distance;
      y = hotspot.y + Math.sin(angle) * distance;

      // Ensure it's within Tunisia's boundaries
      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(minY, Math.min(maxY, y));
    } else {
      // Generate a random point within Tunisia's boundaries
      x = minX + Math.random() * (maxX - minX);
      y = minY + Math.random() * (maxY - minY);
    }

    farms.push({
      id: `farm-${i}`,
      name: `Farm ${i + 1}`,
      x,
      y,
      products: [
        ["tomatoes", "potatoes", "onions", "olives", "dates"][
          Math.floor(Math.random() * 5)
        ],
      ],
      owner: `Farmer ${i + 1}`,
      location: ["Béja", "Sidi Bouzid", "Kairouan", "Nabeul", "Gafsa"][
        Math.floor(Math.random() * 5)
      ],
      size: Math.floor(Math.random() * 50) + 5, // Farm size in hectares
      established: 2000 + Math.floor(Math.random() * 23), // Year established between 2000-2023
    });
  }

  return farms;
};

// Generate mock traffic data
const generateTrafficData = (farms, product, period, viewType) => {
  const governorateKeys = Object.keys(governorates);
  const trafficData = [];

  // For each farm, create connections to 1-3 governorates
  farms.forEach((farm) => {
    // Skip farms that don't produce the selected product
    if (product !== "all" && !farm.products.includes(product)) {
      return;
    }

    // Determine how many governorates this farm connects to
    const connectionCount = Math.floor(Math.random() * 3) + 1;

    // Select random governorates
    const selectedGovernorates = [];
    for (let i = 0; i < connectionCount; i++) {
      let govKey;
      do {
        govKey =
          governorateKeys[Math.floor(Math.random() * governorateKeys.length)];
      } while (selectedGovernorates.includes(govKey));

      selectedGovernorates.push(govKey);
    }

    // Create traffic connections
    selectedGovernorates.forEach((govKey) => {
      // Generate a random volume based on the period
      let volumeMultiplier = 1;
      if (period === "week") volumeMultiplier = 1;
      else if (period === "month") volumeMultiplier = 4;
      else if (period === "quarter") volumeMultiplier = 12;
      else if (period === "year") volumeMultiplier = 52;

      const volume =
        Math.floor(Math.random() * 20 * volumeMultiplier) +
        5 * volumeMultiplier;

      // For requests, traffic flows from governorates to farms
      // For offers, traffic flows from farms to governorates
      const from = viewType === "requests" ? govKey : farm.id;
      const to = viewType === "requests" ? farm.id : govKey;

      trafficData.push({
        id: `traffic-${farm.id}-${govKey}`,
        from,
        to,
        volume,
        product: product === "all" ? farm.products[0] : product,
        farmName: farm.name,
        farmId: farm.id,
        governorateName: governorates[govKey].name,
        governorateId: govKey,
        price: Math.floor(Math.random() * 50) + 10, // Random price between 10-60
        deadline: new Date(
          Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0], // Random deadline within next 30 days
        status: ["open", "accepted", "fulfilled"][
          Math.floor(Math.random() * 3)
        ],
      });
    });
  });

  return trafficData;
};

// Function to get line color based on product
const getProductColor = (productName) => {
  const colors = {
    tomatoes: "#e53935",
    potatoes: "#8d6e63",
    onions: "#9575cd",
    olives: "#7cb342",
    dates: "#ff8f00",
  };
  return colors[productName] || "#2196f3";
};

// Main component
export default function TrafficMap({ product, period, viewType }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [farms, setFarms] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mapType, setMapType] = useState("satellite"); // "satellite" or "simple"

  // Visibility toggles
  const [visibility, setVisibility] = useState({
    governorates: true,
    farms: true,
    tomatoes: false,
    potatoes: false,
    onions: false,
    olives: false,
    dates: false,
  });

  // Toggle visibility of a specific element
  const toggleVisibility = (key) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Generate farms on initial render
  useEffect(() => {
    const generatedFarms = generateFarms(100);
    setFarms(generatedFarms);
  }, []);

  // Generate traffic data when filters change or farms are updated
  useEffect(() => {
    if (farms.length > 0) {
      const newData = generateTrafficData(farms, product, period, viewType);
      setTrafficData(newData);
    }
  }, [farms, product, period, viewType]);

  // Calculate the maximum volume for scaling line widths
  const maxVolume = useMemo(() => {
    if (trafficData.length === 0) return 1;
    return Math.max(...trafficData.map((item) => item.volume));
  }, [trafficData]);

  // SVG map of Tunisia (simplified outline)
  const tunisiaOutline = `M710.3 586.5l0.1 5.7-3 12-0.3 2-0.1 7-1.9 8.6 0.8 13.1-1.5 13.3 0 6.9 2.2 4.9 7.1 7 2.5 4.5 0.4 5.3-1.9 3.9-2.2 2.1-1.3 1.2-7.4 5-27.7 13.3-32.8 15.8-2.9 3.1-4.3 9.9-3.5 3.5-3.8 2.4-3.6 2.9-2 0.6-2-0.7-1.9-1.1-2-0.3-2.4 2.6-0.8 10-1.4 4.1-4.5 4.2-1.8 4.3-1.3 1.9-1.5 1.6-1.7 1.4-5.8 2.3-12-0.2-5.4 4.4-7.2 12.7-6.7 7.6-1.7 2.9-1.1 8.1 0.2 2.2 7.9 21.2 3.2 13.1 3.4 7.1 0.1 2.3-0.6 4.7 0.5 4.4 2.6 8.7 0 4.1-1.7 5-6.5 13.6-9.7 11.1-11.2 18.1-13.2 17.1-2.7 1.6-7.7 0.5-3.1 0.9-23.7 12.5-3-13.5-3-13.5-3.1-13.5-3-13.6-3-13.6-3-13.6-3-13.6-3-13.6-3-13.6-3-13.7-3-13.7-3-13.6-3-13.8-3-13.7-3-13.7-3.1-13.8-0.2-1.3-2-8.9-1.2-2.4-1.4-1.8-17.9-12.9-22.2-16.1-16.9-12.3-13-8.4-2.9-3.1-0.2-0.2-1.2-4.2-1-13-1.5-17.7-1.4-4-10.8-16.9-10-15.7-2.4-1.5-2.2 0.5-2.2-0.1-2.2-0.7-2-1.1-11.8-8.5-3.8-1.3-5.1-0.5-3.9-1.2-2.8-3-1.6-5.9-0.1-16.8 0-0.6-1.6-4.9-8.2-14.3-6.7-11.8-0.9-3.2-1.1-6.7-3-5.9-0.8-2.2-1.4-7-0.6-5 2.2-12.8 0.4-9.4 1.4-3.5 2.3-2.4 4.3-4.5 2.6-3.4 2.9-3 4.1-2.1 6.8-1.1 2-1.1 1.3-1.6 1-2.1 4-15.2 2-4.5 4.2-3 9.2-4.1 4.4-3.1 10.1-4.7 0.9-0.8 4.3-3.9 2.5-1.5 0.9-0.9 0.4-0.9 0.8-2.2 0.7-1.1 3.8-2.4 0.8-1.4-2.8-4.3 0.3-2 1.3-2 3.4-3.6 0.1-0.2 0.9-1.1 0.3-1.8-2-13-0.2-4.8 1.1-5 2.5-7 1.9-9.5 1.4-4.6 5-5.5 6.4-9.9 1-2.6-3.6-2.8-4.4-1.4-4-2-2.5-4.6-0.7-5.3 0.3-4.8 1.1-4.5 3.8-9.2 0-3.9-1-10.9-0.4-4-1.8-4.3-5.2-8.5-1.2-4.6-0.5-5.5 0.6-10.4 2.3-8.2 0.4-1.6 0.3-7.2 2.3-9.7 1.2-2.1 0.9-2.5-0.2-2.4-0.8-2.4-0.5-2.6 0.5-5.5 5-14.1 0.1-0.7 0.3-1.8 0.1-5.4-0.2-2.6-0.9-2.4-1.6-1-2-0.5-2-1.1-9.3-1.2-4.3-1.8 0-0.1 0.2-4.4 2.5-3.1 3.1-1.9 6.8-2.6 12.9-7.9 2.3-2.6 2.5-4.6 0.9-4.7-2.2-2.7-3.7-1.9 0.7-2.2 3.3-1.6 4.1-0.5 4 0.3 3.6-0.8 7.4-2.9 1.9-1.4 0-1.6-3.6-5.6-0.4-1.4 0.1-1.6-0.3-3.5 2-0.8 7.5-3.1 2.6-0.5 9.1 0 2.3-0.9 4.4-3.7 3.2-1.5 0.8-0.4 2.4-2.3 3.3-4 3.2-6.3 1.5-1 1-0.5 3-3.2 1.1-0.7 3.2-1.3 8.4-3.4 1.3-0.8 2.2-3.7 2-1 14-0.2 4-1.6 2.6-2.8 1.5-1 1.4 0.6 1.1 0.6 1.2-0.2 1.1-0.5 3.1-0.8 2.5-1.1 2.3-1.6 1.5-1.5 2.1 1.3 2-0.4 3.9-2.7 2.2-1.2 1.8-0.4 4.7-0.1 2.3-1 1.3-0.2 1.1 0.7 0.9 0.8 1.1 0.4 9 0.2 0 0.4 0.3 1.3 0 6-3.3 2.7-4 1.7-2.2 3.3 0.3 1 1.7 3.7 0.5 0.8 0.6 0.4 0.7 1.9 0.9 0.4 4.6 0.7 2.2-0.5 2.3-1.9 1.3-1.8 1.2-2.5-0.1-2.1-6.7-2.8-1 0.1-2.2 0.7-1.2 0 0-0.8 2.5-1.8 1.1-0.3 0.6-0.6 0.5-0.7 0.3-0.3 1.6-0.3 10.4 2.4 1.9-0.2 5.6-2.6 0.9 0.3 1.7 2.6 7.5 1.1 3.4 3.2 7.9 2.8 2 1.8-3.4 0.9-1.5 0.6-1.5 1.1-0.6-2.2-2.9-0.4-3.4 0.9-1.9 1.7 0.8 2.2 2.7 1 3.2 0.2 2.1-0.6 0.7 1.2 1 1.5 0.3 1.2-0.6 1.6-0.7-1.9-4.6 4.6 0.8 6.5 4 6.7 4.9 5 3.9 1.9 1.2 0.8 2.4 3.5 1.1 1.6-0.5 1.5-2.5 2.5-1 2.7-1.1 1-1.5 0.3-1.4-1.2 0.8-2.1-1-0.5-1.8 0.3-3.4 1.1-1.1 0.8-1.8 2.6-0.5 1.9 1.5 0.7 3.3 0.1 1.4 0.7 0.7-0.7 0.3-0.3 1.6-2.9 2.3 5.1 2.8 3.8 3.8 2.3 5 0.6 1.5-0.4 2.1 0.1 5.4-2.7 3.3-0.8 2.1-2.2 0.8-3.7 0.7-3 1.5-5.4 1.9-1.7 2.3-0.4 4.9 0.3 4.5-0.8 4.1-1.7 5.2-3.8 3.3-3.4 1-0.5 0.4-1.2 0.3-0.7 6.1-5 0.9-1.1 0.3-1.5-0.4-0.9-0.2-0.8 1-1.4 2.2-1.1 5.4-0.5 4.1-3.2 2.2-0.3 1.8 0.9 1 2.4-0.1 1.1-1.1 1.6-0.3 1.4 0.3 1.5 1 1.9 0.2 1.2 0.4 0.9 1.9 2.8 0.6 1.3 0.3 1.3 0.2 2.8 0.3 1.3 0.4 1.1 0.8 1.2 0.7 0.9 0.6 0.4 0.6 0.8 1.3 2-0.6 2.2-1.5 2-4.2 1.8-5.8 4.9-3.2 5.8-4.5 6.7-7.4 13.9-5.8 14.3-2.7 3.7-8.8 2.3-10.2 5.8-3.7-1-3.7 2.7-3.4 5.3-1.5 5-1.4 5.4-1.3 5.4-0.2 6.8-0.3 7 0.5 4.3 1.4 4.5 0.8 2.3 0.5 0.9 0.5 1.3 0.6 2.8 0.4 1.2 2.3 3.6 1.7 1.9 1.5 0.9 1.2 1.3 2.8 8.6 1.5 1.7 7.3 7 0.3 0.2 2 1.1 3.2 1.3 6.4-2.3 1.1 0.3 1 0.6 1.9 1.8-1.2 1.7-0.6 2.6 0.6 2.7 1.2 1.8 4.3 2.1 9.5 3.8 4.3-0.5 3.1 2.6 1.5 3-4.1 1.6-0.5 3 0.2 2.2 0.1 1 1 2.8 1.6 1.9 4.9 1.6-2.9 2.6-0.8 3.5-0.5 3.2 0.4 5.7-1.3 2.7 0.5 4.7 2.5 4 3.8 4.8 2.2 1.7 2.6 1.2 1.5 0.8-0.2 2.5-2.9 0.1-2.1 1.6-2.1 4.1-3.1 2.7-1.5 2.9-1.5 3.1-2 1.8 0.7 3.7-0.4 3.9-3.6 4.6-4.1 2-3 3.4 0.8 3-0.9 2.7 0 5.1-4.4 3.2-0.9 1-0.7 0.6-0.4 0.7 1.2 2.6 0.4 1.8-3.9 1.8-2.5 1.9-3.4 3.7-1.6 3.4-2.1 1.9-1 2.3-1.8 2.1-1.8 1.1-7 2.3-1 0.6-0.4 0.9-0.2 1.4-0.5 1.6-0.8 1.3-0.2 2.5-0.7 1.5-0.2 2.3-1.6 1.5-2.4 1.2-9.9 1.5-3.6 2-5.6 9.4-5.2 1.3-1 0-1-0.5-1.2-0.1-1.3 0.5-0.6 0.6-0.4 0.8-2.3 3.1-1 0.8-1.4 0.4-5 2.2-2.1 1.7-4.3 1.7-2.6 2.8-1.3 4-3.8 7.7-2.2 3.6-1.5 0.5-0.9 1-0.6 0.3 1 2.2 0.4 2.6 0 5.3 0.4 2.4 1.5 4.9 0.4 2.4 1 4.2 2.4 4.7 9.7 14.1 1 1 1.5 0.8 15.2 15.2 4 2.4 8.3 3.6 1.5 0.4 3.1 0.7 7.3-1.1 8-2.3 6.8-3.7 2-0.5 2.5 4.5-0.4 8.7-3.1 2.7-1.7 0.7-1.3 1.8-0.5 2.1 0.6 2 2.5 4.3 1.4 1.6 2.3 0.7 4.5-1 8-4.9 3.8-1.1 1.8-0.8 1.7-2 0.8-2.4-0.7-2.2-1.8-2.1-0.3-1.1 3.2-2.5 1.2 0.8 1.4 0.3 1.1-0.6 0.7-1.4 0.7 0 1.7 1.1 4.5 2.1 1.8 1.2 1.4 1.8 3.7 5.7 0.4 1.2 0.5 6.4-2.8 4.5 2.2 7.8-0.9 3.7 3-1 2.1 2.3 2.1 2.8 2.5 1.4 2.5 0.6 5.5 2.8 2.6 0.9-0.7 0.6-0.3 0.2-0.5 0.1-10.4-3.4-5.1-0.6-1.2 4 1 1.5 1.7 1.4 1.7 1.8 0.7 2.7 1 1.3 2.3 0 4.7-0.9 4.5 1 8.9 3.4 4.7 0 1.8-1.3-0.6-1.7-1.8-1.5-1.9-0.7-1.2-0.8-1.5-1.8-1.7-1.8 9.6 6.9 5.9 2.8 0.7 0.2 0.1 0z m-54.5-84l2.1 1.3 2.1 1 1.9 1.1 1.2 1.8-7 6.5-1.8 0.9-0.6 0.5-0.5 1.1-1.1 4.1-0.6 0 0.3-3.3 0.3-1.1-1.6 0.6-1.4 4-1.9 2.9-1.7 2-0.7 2.3-1.7-1.8-0.1-2.3 0.7-2-1.9-3-1.8-0.8-1.7-1.5-1.8-0.6-2 2-0.9 1.9-2 0.4-2.4-1.9-0.7-2-0.6-3.5 0-3.3 2.1-3.6-1.3-5.3 0-3.9 4-1.5 8.6 1.9 4.6 0.3 3.4-2.2 3.2 3.9 3.3 3.1z m-2.9-104.6l1.1-0.8 1.4-1.1 12.1 0.1 1 1.5-1.6 1.6-4.3 3.3-2-0.4-2.1-1.1-3.5-1.7-2.1-1.4z m32-15l1 0.4 0.6 0.9 2.6 2.7-0.9 1.7-10.3 4.4-5.4 3.3-1.9 0.8-0.9-2.2 1.5-1.8 1.7-1.6 1.9-2.8 0.3-1.8-0.1-0.9 0.1-1.1 0.8-0.5 0.3 1.2 1.6 1.1 2.5-0.5 0.2-2.9-0.7-1.5 0.8-1.7 1.3-1.2 0.8-1.4 1-1.4 1.7 1 3.1 0.5 0.5 1.2-2.8 0.9-0.4 0.8-0.6 0.8-0.3 1.6z`;

  // Get coordinates for a point (farm or governorate)
  const getPointCoordinates = (pointId) => {
    if (pointId.startsWith("farm-")) {
      const farm = farms.find((f) => f.id === pointId);
      return farm ? { x: farm.x, y: farm.y } : null;
    } else {
      return governorates[pointId];
    }
  };

  // Filter traffic data based on visibility settings
  const visibleTrafficData = trafficData.filter((traffic) => {
    return visibility[traffic.product];
  });

  // Handle click on traffic line
  const handleTrafficClick = (traffic) => {
    router.push(`/admin/requests/${traffic.id}`);
  };

  // Handle click on farm
  const handleFarmClick = (farm) => {
    router.push(`/admin/farms/${farm.id}`);
  };

  // Handle click on governorate
  const handleGovernorateClick = (governorateId) => {
    router.push(`/admin/markets/${governorateId}`);
  };

  return (
    <div className="relative h-[600px] w-full rounded-md border bg-white">
      {/* Map Type Toggle */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-md bg-white p-2 shadow-md">
        <Button
          variant={mapType === "simple" ? "default" : "outline"}
          size="sm"
          onClick={() => setMapType("simple")}
          className="flex items-center gap-1"
        >
          <MapIcon className="h-4 w-4" />
          <span className="text-xs">{t("simpleMap", "admin")}</span>
        </Button>
        <Button
          variant={mapType === "satellite" ? "default" : "outline"}
          size="sm"
          onClick={() => setMapType("satellite")}
          className="flex items-center gap-1"
        >
          <LayersIcon className="h-4 w-4" />
          <span className="text-xs">{t("satelliteMap", "admin")}</span>
        </Button>
      </div>

      {/* Map Container */}
      <div className="relative h-full w-full">
        {/* Satellite Background */}
        {mapType === "satellite" && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/images/tunisia-satellite.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8,
            }}
          >
            {/* This would be replaced with an actual satellite image of Tunisia */}
          </div>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox="50 21 600 600"
          className="overflow-visible"
        >
          {/* Tunisia outline - only show in simple map mode */}
          {mapType === "simple" && (
            <svg viewBox="120 60 800 500">
              <path
                d={tunisiaOutline}
                fill="#f5f5f5"
                stroke="#ccc"
                strokeWidth="2"
              />
            </svg>
          )}

          {/* Draw traffic lines */}
          {visibleTrafficData.map((traffic, idx) => {
            const fromPoint = getPointCoordinates(traffic.from);
            const toPoint = getPointCoordinates(traffic.to);

            if (!fromPoint || !toPoint) return null;

            // Skip if either endpoint is not visible
            const isFromFarm = traffic.from.startsWith("farm-");
            const isToFarm = traffic.to.startsWith("farm-");

            if (
              (isFromFarm && !visibility.farms) ||
              (isToFarm && !visibility.farms) ||
              (!isFromFarm && !visibility.governorates) ||
              (!isToFarm && !visibility.governorates)
            ) {
              return null;
            }

            // Calculate line width based on volume (scaled)
            const lineWidth = Math.max(
              1,
              Math.min(8, (traffic.volume / maxVolume) * 8)
            );

            // Get color based on product
            const lineColor = getProductColor(traffic.product);

            return (
              <g key={`traffic-${idx}`}>
                <line
                  x1={fromPoint.x}
                  y1={fromPoint.y}
                  x2={toPoint.x}
                  y2={toPoint.y}
                  stroke={lineColor}
                  strokeWidth={lineWidth}
                  strokeOpacity="0.7"
                  strokeDasharray={viewType === "requests" ? "5,5" : "none"}
                  onMouseEnter={() => setHoveredItem(traffic)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleTrafficClick(traffic)}
                  style={{ cursor: "pointer" }}
                />
                {/* Arrow for direction */}
                <polygon
                  points={`${(fromPoint.x + toPoint.x) / 2},${
                    (fromPoint.y + toPoint.y) / 2
                  } 
                           ${(fromPoint.x + toPoint.x) / 2 - 5},${
                    (fromPoint.y + toPoint.y) / 2 - 5
                  } 
                           ${(fromPoint.x + toPoint.x) / 2 + 5},${
                    (fromPoint.y + toPoint.y) / 2 - 5
                  }`}
                  fill={lineColor}
                  transform={`rotate(${
                    Math.atan2(
                      toPoint.y - fromPoint.y,
                      toPoint.x - fromPoint.x
                    ) *
                      (180 / Math.PI) +
                    90
                  }, 
                             ${(fromPoint.x + toPoint.x) / 2}, ${
                    (fromPoint.y + toPoint.y) / 2
                  })`}
                />
              </g>
            );
          })}

          {/* Draw farm markers */}
          {visibility.farms &&
            farms.map((farm) => (
              <circle
                key={farm.id}
                cx={farm.x}
                cy={farm.y}
                r="3"
                fill="#4caf50"
                stroke="#333"
                strokeWidth="0.5"
                onMouseEnter={() => setHoveredPoint({ ...farm, type: "farm" })}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => handleFarmClick(farm)}
                style={{ cursor: "pointer" }}
              />
            ))}

          {/* Draw governorate markers - all with the same color */}
          {visibility.governorates &&
            Object.entries(governorates).map(([key, gov]) => (
              <g key={`gov-${key}`}>
                <circle
                  cx={gov.x}
                  cy={gov.y}
                  r="8"
                  fill="#1976d2" // Same blue color for all governorates
                  fillOpacity="0.8"
                  stroke="#333"
                  strokeWidth="1"
                  onMouseEnter={() =>
                    setHoveredPoint({ ...gov, id: key, type: "governorate" })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => handleGovernorateClick(key)}
                  style={{ cursor: "pointer" }}
                />
                <text
                  x={gov.x}
                  y={gov.y + 20}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#333"
                  fontWeight="bold"
                >
                  {gov.name}
                </text>
              </g>
            ))}
        </svg>

        {/* Tooltip for traffic lines */}
        {hoveredItem && (
          <div
            className="absolute z-10 rounded-md bg-white p-2 shadow-lg"
            style={{
              left: (() => {
                const fromPoint = getPointCoordinates(hoveredItem.from);
                const toPoint = getPointCoordinates(hoveredItem.to);
                return (fromPoint.x + toPoint.x) / 2;
              })(),
              top: (() => {
                const fromPoint = getPointCoordinates(hoveredItem.from);
                const toPoint = getPointCoordinates(hoveredItem.to);
                return (fromPoint.y + toPoint.y) / 2;
              })(),
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="text-sm font-medium">
              {viewType === "requests"
                ? t("request", "general")
                : t("offer", "general")}
            </div>
            <div className="text-xs">
              {hoveredItem.farmName} {viewType === "requests" ? "←" : "→"}{" "}
              {hoveredItem.governorateName}
            </div>
            <div className="text-xs">
              {t("product", "general")}: {t(hoveredItem.product, "admin")}
            </div>
            <div className="text-xs">
              {t("volume", "admin")}: {hoveredItem.volume} {t("tons", "admin")}
            </div>
            <div className="text-xs text-blue-600">
              {t("clickForDetails", "admin")}
            </div>
          </div>
        )}

        {/* Tooltip for points (farms and governorates) */}
        {hoveredPoint && (
          <div
            className="absolute z-10 rounded-md bg-white p-2 shadow-lg"
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="text-sm font-medium">{hoveredPoint.name}</div>
            <div className="text-xs">
              {hoveredPoint.type === "governorate"
                ? t("marketDestination", "admin")
                : t("productionSource", "admin")}
            </div>
            {hoveredPoint.type === "farm" && hoveredPoint.products && (
              <div className="text-xs">
                {t("produces", "admin")}:{" "}
                {hoveredPoint.products.map((p) => t(p, "admin")).join(", ")}
              </div>
            )}
            <div className="text-xs text-blue-600">
              {t("clickForDetails", "admin")}
            </div>
          </div>
        )}

        {/* Legend with toggle switches */}
        <div className="absolute bottom-4 right-4 max-h-[280px] w-64 overflow-y-auto rounded-md bg-white p-3 shadow-md">
          <div className="mb-2 text-sm font-medium">{t("legend", "admin")}</div>

          {/* Map Elements */}
          <div className="mb-2 border-b pb-2">
            <div className="mb-1 text-xs font-medium text-gray-500">
              {t("mapElements", "admin")}
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                <span className="text-xs">
                  {t("marketDestinations", "admin")}
                </span>
              </div>
              <Switch
                checked={visibility.governorates}
                onCheckedChange={() => toggleVisibility("governorates")}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">
                  {t("productionSources", "admin")}
                </span>
              </div>
              <Switch
                checked={visibility.farms}
                onCheckedChange={() => toggleVisibility("farms")}
                size="sm"
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="mb-1 text-xs font-medium text-gray-500">
              {t("products", "admin")}
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-red-500"></div>
                <span className="text-xs">{t("tomatoes", "admin")}</span>
              </div>
              <Switch
                checked={visibility.tomatoes}
                onCheckedChange={() => toggleVisibility("tomatoes")}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-amber-800"></div>
                <span className="text-xs">{t("potatoes", "admin")}</span>
              </div>
              <Switch
                checked={visibility.potatoes}
                onCheckedChange={() => toggleVisibility("potatoes")}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-purple-400"></div>
                <span className="text-xs">{t("onions", "admin")}</span>
              </div>
              <Switch
                checked={visibility.onions}
                onCheckedChange={() => toggleVisibility("onions")}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-green-600"></div>
                <span className="text-xs">{t("olives", "admin")}</span>
              </div>
              <Switch
                checked={visibility.olives}
                onCheckedChange={() => toggleVisibility("olives")}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-amber-500"></div>
                <span className="text-xs">{t("dates", "admin")}</span>
              </div>
              <Switch
                checked={visibility.dates}
                onCheckedChange={() => toggleVisibility("dates")}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
