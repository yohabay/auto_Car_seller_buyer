export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  discount: number
  mileage: number
  fuelType: string
  transmission: string
  condition: string
  exteriorColor: string
  interiorColor: string
  seats: number
  location: string
  description: string
  features: string[]
  images: string[]
}

export const cars: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2023,
    price: 89990,
    discount: 3000,
    mileage: 1250,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "New",
    exteriorColor: "Midnight Silver",
    interiorColor: "Black",
    seats: 5,
    location: "San Francisco, CA",
    description:
      "Experience the future of driving with this Tesla Model S. This all-electric luxury sedan offers exceptional range, performance, and cutting-edge technology. With Autopilot capabilities and over-the-air updates, this vehicle continues to improve over time.",
    features: [
      "Autopilot",
      "17-inch touchscreen",
      "Wireless charging",
      "Premium audio system",
      "Heated seats",
      "Glass roof",
      "360-degree cameras",
      "Adaptive cruise control",
    ],
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620891549027-942faa56aabc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619767886558-efdc7e9e5fa4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619767886744-c5d5e94d0a8a?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 65990,
    discount: 0,
    mileage: 8750,
    fuelType: "Hybrid",
    transmission: "Automatic",
    condition: "Used",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac",
    seats: 5,
    location: "Los Angeles, CA",
    description:
      "This BMW X5 combines luxury, performance, and efficiency with its hybrid powertrain. Featuring premium materials throughout the cabin and the latest technology, this SUV delivers a refined driving experience with reduced environmental impact.",
    features: [
      "Panoramic sunroof",
      "Head-up display",
      "Harman Kardon sound system",
      "Heated and ventilated seats",
      "Gesture control",
      "Adaptive suspension",
      "Wireless Apple CarPlay",
      "Parking assistant",
    ],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520031441872-956195f7e6a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "3",
    make: "Mercedes-Benz",
    model: "EQS",
    year: 2023,
    price: 102990,
    discount: 5000,
    mileage: 500,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "New",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Beige",
    seats: 5,
    location: "Miami, FL",
    description:
      "The Mercedes-Benz EQS represents the pinnacle of electric luxury. With its aerodynamic design, impressive range, and the revolutionary MBUX Hyperscreen, this sedan offers a glimpse into the future of premium mobility.",
    features: [
      "MBUX Hyperscreen",
      "Burmester 3D sound system",
      "Active ambient lighting",
      "Augmented reality navigation",
      "Energizing comfort programs",
      "Air suspension",
      "Digital Light headlamps",
      "Rear-wheel steering",
    ],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605515298946-d0573716f0e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "4",
    make: "Porsche",
    model: "911 Carrera",
    year: 2022,
    price: 115990,
    discount: 0,
    mileage: 3200,
    fuelType: "Gasoline",
    transmission: "PDK",
    condition: "Used",
    exteriorColor: "Guards Red",
    interiorColor: "Black",
    seats: 4,
    location: "Chicago, IL",
    description:
      "This Porsche 911 Carrera delivers the iconic sports car experience with modern refinements. The flat-six engine provides exhilarating performance, while the sophisticated chassis ensures precise handling and everyday usability.",
    features: [
      "Sport Chrono Package",
      "Adaptive sport seats",
      "Bose surround sound system",
      "Sport exhaust system",
      "Lane change assist",
      "Porsche Dynamic Light System",
      "Heated multifunction steering wheel",
      "Porsche Torque Vectoring",
    ],
    images: [
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "5",
    make: "Audi",
    model: "e-tron GT",
    year: 2023,
    price: 99990,
    discount: 2500,
    mileage: 1800,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "Used",
    exteriorColor: "Daytona Gray",
    interiorColor: "Arras Red",
    seats: 4,
    location: "Seattle, WA",
    description:
      "The Audi e-tron GT combines stunning design with electric performance. This four-door grand tourer offers instant acceleration, precise handling, and fast-charging capabilities, all wrapped in a sleek and sophisticated package.",
    features: [
      "Matrix LED headlights",
      "Bang & Olufsen sound system",
      "Carbon fiber roof",
      "Adaptive air suspension",
      "Massage front seats",
      "Night vision assistant",
      "Head-up display",
      "All-wheel steering",
    ],
    images: [
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664389761-1e0bc5095686?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664389734-dbcf4903c6a1?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "6",
    make: "Lexus",
    model: "LC 500",
    year: 2022,
    price: 93990,
    discount: 4000,
    mileage: 5600,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "Used",
    exteriorColor: "Infrared",
    interiorColor: "Toasted Caramel",
    seats: 4,
    location: "Austin, TX",
    description:
      "The Lexus LC 500 is a grand touring coupe that blends breathtaking design with exhilarating performance. Its naturally aspirated V8 engine delivers a visceral driving experience, complemented by a meticulously crafted interior.",
    features: [
      "Mark Levinson Reference audio",
      "Glass roof with sunshade",
      "Alcantara and leather interior",
      "Adaptive Variable Suspension",
      "Color head-up display",
      "Intuitive parking assist",
      "Premium triple-beam LED headlamps",
      "Dynamic Radar Cruise Control",
    ],
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542230387-f84e1ad43d20?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542282811-943ef1a977c3?w=800&h=600&fit=crop",
    ],
  },
]
