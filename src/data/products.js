export const products = [
  {
    id: 101,
    title: "Samsung A10",
    category_id: 1,
    image: "/images/prod-a10.jpg",
    variants: [
      { id: 1001, sku: "SAM-A10-2GB", ram: "2GB", price: 100, stock: 20 },
      { id: 1002, sku: "SAM-A10-4GB", ram: "4GB", price: 120, stock: 15 },
      { id: 1003, sku: "SAM-A10-6GB", ram: "6GB", price: 140, stock: 10 },
    ],
  },
  {
    id: 102,
    title: "iPhone 12",
    category_id: 1,
    image: "/images/prod-iphone12.jpg",
    variants: [
      { id: 2001, sku: "IPH-12-64", storage: "64GB", price: 799, stock: 8 },
      { id: 2002, sku: "IPH-12-128", storage: "128GB", price: 899, stock: 6 },
    ],
  },
  {
    id: 103,
    title: "Dell Inspiron 15",
    category_id: 2,
    image: "/images/prod-dell.jpg",
    variants: [
      { id: 3001, sku: "DEL-INS-I3", cpu: "i3", price: 600, stock: 6 },
      { id: 3002, sku: "DEL-INS-I5", cpu: "i5", price: 750, stock: 5 },
    ],
  },
  {
    id: 104,
    title: "Sony WH-1000XM4",
    category_id: 3,
    image: "/images/prod-sony.jpg",
    variants: [
      { id: 4001, sku: "SONY-WH-STD", color: "Black", price: 299, stock: 12 },
    ],
  },
];
