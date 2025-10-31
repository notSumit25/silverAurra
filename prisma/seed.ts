import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const adminPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  // Seed a couple of customer users
  const customerPassword = await bcrypt.hash("User@123", 10);
  const [alice, bob] = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
        email: "alice@example.com",
        passwordHash: customerPassword,
        name: "Alice Sharma",
        role: "CUSTOMER",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: {
        email: "bob@example.com",
        passwordHash: customerPassword,
        name: "Bob Kumar",
        role: "CUSTOMER",
      },
    }),
  ]);

  console.log("Customer users created:", alice.email, bob.email);

  const categories = [
    {
      name: "Rings",
      slug: "rings",
      description: "Exquisite gold and diamond rings for every occasion",
      imageUrl:
        "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg",
    },
    {
      name: "Earrings",
      slug: "earrings",
      description: "Elegant earrings to complement your style",
      imageUrl:
        "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
    },
    {
      name: "Necklaces",
      slug: "necklaces",
      description: "Beautiful necklaces crafted with precision",
      imageUrl:
        "https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg",
    },
    {
      name: "Bangles",
      slug: "bangles",
      description: "Traditional and modern bangles in gold",
      imageUrl:
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
    },
    {
      name: "Bracelets",
      slug: "bracelets",
      description: "Sophisticated bracelets for contemporary women",
      imageUrl:
        "https://images.pexels.com/photos/1454186/pexels-photo-1454186.jpeg",
    },
    {
      name: "Pendants",
      slug: "pendants",
      description: "Graceful pendants with intricate designs",
      imageUrl:
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(created);
    console.log("Category created:", created.name);
  }

  const products = [
    {
      name: "Eternal Love Diamond Ring",
      description:
        "A stunning 18K gold ring featuring a brilliant-cut diamond, symbolizing eternal love and commitment.",
      price: 45000,
      originalPrice: 52000,
      stock: 15,
      imageUrls: [
        "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg",
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      ],
      material: "18K Gold, Diamond",
      weight: "3.5g",
      dimensions: "Ring Size: Adjustable",
      categoryId: createdCategories[0].id,
      featured: true,
      bestseller: true,
    },
    {
      name: "Classic Gold Band",
      description:
        "Simple yet elegant 22K gold band, perfect for everyday wear or as a wedding ring.",
      price: 28000,
      originalPrice: 32000,
      stock: 25,
      imageUrls: [
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      ],
      material: "22K Gold",
      weight: "4.2g",
      dimensions: "Ring Size: 6-8",
      categoryId: createdCategories[0].id,
      bestseller: true,
    },
    {
      name: "Royal Solitaire Ring",
      description:
        "Majestic solitaire diamond ring in platinum setting, a timeless piece of luxury.",
      price: 95000,
      originalPrice: 110000,
      stock: 8,
      imageUrls: [
        "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg",
      ],
      material: "Platinum, Diamond",
      weight: "4.8g",
      dimensions: "Ring Size: Customizable",
      categoryId: createdCategories[0].id,
      featured: true,
    },
    {
      name: "Floral Diamond Studs",
      description:
        "Delicate floral-design diamond studs in 18K white gold, perfect for any occasion.",
      price: 38000,
      originalPrice: 45000,
      stock: 20,
      imageUrls: [
        "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
      ],
      material: "18K White Gold, Diamond",
      weight: "2.5g",
      categoryId: createdCategories[1].id,
      featured: true,
      bestseller: true,
    },
    {
      name: "Golden Drop Earrings",
      description:
        "Elegant drop earrings in 22K gold with intricate craftsmanship.",
      price: 25000,
      stock: 30,
      imageUrls: [
        "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
      ],
      material: "22K Gold",
      weight: "5.2g",
      categoryId: createdCategories[1].id,
    },
    {
      name: "Pearl Dangle Earrings",
      description:
        "Beautiful dangle earrings featuring lustrous pearls set in gold.",
      price: 32000,
      originalPrice: 38000,
      stock: 18,
      imageUrls: [
        "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
      ],
      material: "18K Gold, Pearl",
      weight: "4.8g",
      categoryId: createdCategories[1].id,
      bestseller: true,
    },
    {
      name: "Royal Heritage Necklace",
      description:
        "Exquisite 22K gold necklace with traditional Indian design, perfect for weddings and special occasions.",
      price: 125000,
      originalPrice: 145000,
      stock: 5,
      imageUrls: [
        "https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg",
      ],
      material: "22K Gold",
      weight: "45g",
      categoryId: createdCategories[2].id,
      featured: true,
    },
    {
      name: "Diamond Choker Necklace",
      description:
        "Contemporary diamond choker in white gold, perfect for modern brides.",
      price: 185000,
      originalPrice: 210000,
      stock: 3,
      imageUrls: [
        "https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg",
      ],
      material: "18K White Gold, Diamond",
      weight: "35g",
      categoryId: createdCategories[2].id,
      featured: true,
      bestseller: true,
    },
    {
      name: "Temple Design Necklace",
      description:
        "Traditional South Indian temple jewelry necklace in pure gold.",
      price: 95000,
      stock: 10,
      imageUrls: [
        "https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg",
      ],
      material: "22K Gold",
      weight: "38g",
      categoryId: createdCategories[2].id,
    },
    {
      name: "Bridal Gold Bangles Set",
      description:
        "Set of 4 traditional 22K gold bangles with intricate patterns, essential for Indian brides.",
      price: 78000,
      originalPrice: 88000,
      stock: 12,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "22K Gold",
      weight: "32g",
      categoryId: createdCategories[3].id,
      bestseller: true,
    },
    {
      name: "Diamond Cut Bangles",
      description:
        "Sparkling diamond-cut gold bangles set, perfect for festive occasions.",
      price: 52000,
      stock: 20,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "22K Gold",
      weight: "22g",
      categoryId: createdCategories[3].id,
    },
    {
      name: "Antique Finish Bangles",
      description: "Beautiful antique finish bangles with traditional motifs.",
      price: 65000,
      originalPrice: 72000,
      stock: 15,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "22K Gold",
      weight: "28g",
      categoryId: createdCategories[3].id,
      featured: true,
    },
    {
      name: "Tennis Diamond Bracelet",
      description:
        "Classic tennis bracelet with brilliant diamonds in white gold setting.",
      price: 145000,
      originalPrice: 165000,
      stock: 7,
      imageUrls: [
        "https://images.pexels.com/photos/1454186/pexels-photo-1454186.jpeg",
      ],
      material: "18K White Gold, Diamond",
      weight: "15g",
      categoryId: createdCategories[4].id,
      featured: true,
      bestseller: true,
    },
    {
      name: "Gold Chain Bracelet",
      description: "Delicate gold chain bracelet, perfect for daily wear.",
      price: 22000,
      stock: 25,
      imageUrls: [
        "https://images.pexels.com/photos/1454186/pexels-photo-1454186.jpeg",
      ],
      material: "18K Gold",
      weight: "6.5g",
      categoryId: createdCategories[4].id,
    },
    {
      name: "Charm Bracelet",
      description: "Trendy charm bracelet with customizable gold charms.",
      price: 28000,
      stock: 18,
      imageUrls: [
        "https://images.pexels.com/photos/1454186/pexels-photo-1454186.jpeg",
      ],
      material: "18K Gold",
      weight: "8.2g",
      categoryId: createdCategories[4].id,
    },
    {
      name: "Lakshmi Pendant",
      description:
        "Traditional Goddess Lakshmi pendant in 22K gold, symbol of prosperity.",
      price: 18000,
      originalPrice: 21000,
      stock: 30,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "22K Gold",
      weight: "5.5g",
      categoryId: createdCategories[5].id,
      bestseller: true,
    },
    {
      name: "Heart Diamond Pendant",
      description: "Romantic heart-shaped diamond pendant in rose gold.",
      price: 35000,
      originalPrice: 40000,
      stock: 20,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "18K Rose Gold, Diamond",
      weight: "3.8g",
      categoryId: createdCategories[5].id,
      featured: true,
    },
    {
      name: "Om Pendant",
      description:
        "Sacred Om symbol pendant in pure gold for spiritual protection.",
      price: 12000,
      stock: 40,
      imageUrls: [
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
      ],
      material: "22K Gold",
      weight: "3.2g",
      categoryId: createdCategories[5].id,
    },
  ];

  // Keep references to created products for reviews
  const createdProducts: { id: string; name: string }[] = [];
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    createdProducts.push({ id: created.id, name: created.name });
    console.log("Product created:", created.name);
  }

  const banners = [
    {
      title: "Diwali Special Collection",
      subtitle: "Up to 25% off on selected jewelry",
      imageUrl:
        "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg",
      link: "/products",
      isActive: true,
      order: 1,
    },
    {
      title: "Bridal Collection 2025",
      subtitle: "Discover the latest bridal designs",
      imageUrl:
        "https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg",
      link: "/products?category=necklaces",
      isActive: true,
      order: 2,
    },
    {
      title: "Diamond Festival",
      subtitle: "Exclusive diamond jewelry at special prices",
      imageUrl:
        "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
      link: "/products",
      isActive: true,
      order: 3,
    },
  ];

  for (const banner of banners) {
    const created = await prisma.banner.create({
      data: banner,
    });
    console.log("Banner created:", created.title);
  }

  // Add some sample reviews
  const db = prisma as any;
  const reviewData: {
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
  }[] = [];

  if (createdProducts[0]) {
    reviewData.push(
      {
        productId: createdProducts[0].id,
        userId: alice.id,
        rating: 5,
        comment: "Absolutely stunning quality and finish. Worth every rupee!",
      },
      {
        productId: createdProducts[0].id,
        userId: bob.id,
        rating: 4,
        comment: "Looks great and feels premium. Slightly tight fit for me.",
      }
    );
  }
  if (createdProducts[3]) {
    reviewData.push({
      productId: createdProducts[3].id,
      userId: alice.id,
      rating: 5,
      comment: "Perfect gift—beautiful sparkle and elegant design.",
    });
  }
  if (createdProducts[7]) {
    reviewData.push({
      productId: createdProducts[7].id,
      userId: bob.id,
      rating: 5,
      comment: "Exceeded expectations. Finishing is top-notch!",
    });
  }

  if (reviewData.length > 0) {
    await db.review.createMany({ data: reviewData, skipDuplicates: true });
    console.log(`Inserted ${reviewData.length} sample reviews.`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
