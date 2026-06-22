// export type Locale = "ar" | "en";

// export const defaultLocale: Locale = "ar";

// export type TranslationSchema = {
//   nav: {
//     shop: string;
//     about: string;
//     admin: string;
//     cart: string;
//     switchLanguage: string;
//   };
//   hero: {
//     button: string;
//   };
//   home: {
//     latestArrivals: string;
//     featuredPieces: string;
//   };
//   latestProducts: {
//     loading: string;
//   };
//   categories: {
//     all: string;
//     dining: string;
//     sofas: string;
//     tables: string;
//     console: string;
//   };
//   productCard: {
//     discountLabel: string;
//     orderButton: string;
//     removeFromCart: string;
//     addToCart: string;
//     details: string;
//     descriptionFallback: string;
//     tag1: string;
//     tag2: string;
//   };
//   addToCart: {
//     added: string;
//     default: string;
//   };
//   cart: {
//     emptyTitle: string;
//     emptyText: string;
//     browse: string;
//     title: string;
//     total: string;
//     checkout: string;
//     currency: string;
//   };
//   productDetail: {
//     backToProducts: string;
//     orderButton: string;
//     specialRequest: string;
//     productLabel: string;
//     priceLabel: string;
//     customizationRequest: string;
//     naturalWood: string;
//     warranty: string;
//     fastDelivery: string;
//   };
//   admin: {
//     sidebar: {
//       dashboard: string;
//       products: string;
//       orders: string;
//       customers: string;
//       settings: string;
//       addProduct: string;
//     };
//     header: {
//       title: string;
//     };
//     dashboard: {
//       overview: string;
//       welcome: string;
//       totalProducts: string;
//       totalOrders: string;
//       totalRevenue: string;
//       totalCustomers: string;
//       recentOrders: string;
//       noRecentOrders: string;
//       recentProducts: string;
//       noProductsYet: string;
//     };
//     products: {
//       management: string;
//       subtitle: string;
//       addProduct: string;
//       allProducts: string;
//       noProductsFound: string;
//       table: {
//         image: string;
//         name: string;
//         category: string;
//         price: string;
//         actions: string;
//       };
//     };
//     customers: {
//       management: string;
//       subtitle: string;
//       allCustomers: string;
//       comingSoon: string;
//     };
//     settings: {
//       title: string;
//       subtitle: string;
//       storeSettings: string;
//       comingSoon: string;
//     };
//     form: {
//       addProductTitle: string;
//       addProductSubtitle: string;
//       editProductTitle: string;
//       back: string;
//       backToProducts: string;
//       productName: string;
//       price: string;
//       discount: string;
//       category: string;
//       stock: string;
//       description: string;
//       uploadImages: string;
//       uploadNewImage: string;
//       saveChanges: string;
//       saveProduct: string;
//       productNamePlaceholder: string;
//       descriptionPlaceholder: string;
//       requireImage: string;
//       addSuccess: string;
//       editSuccess: string;
//       failedSend: string;
//       serverError: string;
//       fetchError: string;
//       errors: {
//         nameMin: string;
//         priceMin: string;
//         descriptionMin: string;
//         discountMin: string;
//         discountMax: string;
//         stockMin: string;
//         categoryRequired: string;
//       };
//     };
//     actions: {
//       confirmDelete: string;
//       deleted: string;
//       deleteFailed: string;
//       deleteError: string;
//     };
//   };
//   chat: {
//     greeting: string;
//     helpText: string;
//     whatsapp: string;
//     call: string;
//     connected: string;
//   };
// };

// export const translations: Record<Locale, TranslationSchema> = {
//   ar: {
//     nav: {
//       shop: "تسوق",
//       about: "قصتنا",
//       admin: "لوحة التحكم",
//       cart: "السلة",
//       switchLanguage: "English",
//     },
//     hero: {
//       button: "تسوق المجموعة",
//     },
//     home: {
//       latestArrivals: "أحدث المنتجات",
//       featuredPieces: "قطع مميزة",
//     },
//     latestProducts: {
//       loading: "جاري تجهيز أحدث الموديلات...",
//     },
//     categories: {
//       all: "الكل",
//       dining: "سفرة",
//       sofas: "انتريهات",
//       tables: "ترابيزات",
//       console: "كونسول",
//     },
//     productCard: {
//       discountLabel: "خصم",
//       orderButton: "اطلب تعديلاتك",
//       removeFromCart: "أزل من السلة",
//       addToCart: "أضف للسلة",
//       details: "عرض كامل التفاصيل",
//       descriptionFallback:
//         "تصميم عصري بخامات عالية الجودة، متاح تعديل المقاسات والألوان حسب طلبك.",
//       tag1: "خشب طبيعي",
//       tag2: "ضمان 3 سنوات",
//     },
//     addToCart: {
//       added: "تمت الإضافة!",
//       default: "إضافة إلى السلة",
//     },
//     cart: {
//       emptyTitle: "سلة المشتريات فارغة",
//       emptyText: "يبدو أنك لم تضف أي قطع بعد.",
//       browse: "تصفح المنتجات",
//       title: "سلة المشتريات",
//       total: "الإجمالي:",
//       checkout: "إتمام الطلب عبر واتساب",
//       currency: "ج.م",
//     },
//     productDetail: {
//       backToProducts: "العودة للمنتجات",
//       orderButton: "اطلب تعديلاتك الخاصة",
//       specialRequest: "أهلاً كومود، محتاج أستفسر عن المنتج ده:",
//       productLabel: "المنتج",
//       priceLabel: "السعر",
//       customizationRequest: "حابب أعدل على المقاسات/الألوان، ممكن تفاصيل أكتر؟",
//       naturalWood: "خشب طبيعي",
//       warranty: "ضمان 3 سنوات",
//       fastDelivery: "توصيل سريع",
//     },
//     admin: {
//       sidebar: {
//         dashboard: "لوحة التحكم",
//         products: "المنتجات",
//         orders: "الطلبات",
//         customers: "العملاء",
//         settings: "الإعدادات",
//         addProduct: "أضف منتج",
//       },
//       header: {
//         title: "إدارة كومود للأثاث",
//       },
//       dashboard: {
//         overview: "نظرة عامة",
//         welcome: "مرحباً بك في لوحة التحكم",
//         totalProducts: "إجمالي المنتجات",
//         totalOrders: "إجمالي الطلبات",
//         totalRevenue: "إجمالي الإيرادات",
//         totalCustomers: "إجمالي العملاء",
//         recentOrders: "الطلبات الأخيرة",
//         noRecentOrders: "لا توجد طلبات حديثة للعرض.",
//         recentProducts: "المنتجات الأخيرة",
//         noProductsYet: "لا توجد منتجات حتى الآن.",
//       },
//       products: {
//         management: "إدارة المنتجات",
//         subtitle: "تحكم في منتجات الأثاث بكل سهولة",
//         addProduct: "أضف منتج",
//         allProducts: "جميع المنتجات",
//         noProductsFound: "لا توجد منتجات. أضف منتجك الأول!",
//         table: {
//           image: "الصورة",
//           name: "الاسم",
//           category: "الفئة",
//           price: "السعر",
//           actions: "الإجراءات",
//         },
//       },
//       customers: {
//         management: "إدارة العملاء",
//         subtitle: "عرض وإدارة بيانات العملاء",
//         allCustomers: "جميع العملاء",
//         comingSoon: "قريباً: إدارة العملاء.",
//       },
//       settings: {
//         title: "الإعدادات",
//         subtitle: "اضبط إعدادات المتجر",
//         storeSettings: "إعدادات المتجر",
//         comingSoon: "لوحة الإعدادات قيد التطوير.",
//       },
//       form: {
//         addProductTitle: "إضافة منتج جديد لـ كومود 🛋️",
//         addProductSubtitle:
//           "أضف منتج جديد وسيتم تحويلك إلى صفحة المنتجات بعد الحفظ.",
//         editProductTitle: "تعديل المنتج",
//         back: "رجوع",
//         backToProducts: "العودة للمنتجات",
//         productName: "اسم المنتج",
//         price: "السعر (جنية)",
//         discount: "نسبة الخصم (%)",
//         category: "فئة المنتج",
//         stock: "المخزون",
//         description: "الوصف",
//         uploadImages: "الصور",
//         uploadNewImage: "رفع صورة جديدة",
//         saveChanges: "حفظ التعديلات",
//         saveProduct: "حفظ المنتج",
//         productNamePlaceholder: "مثلاً: صالون كلاسيك",
//         descriptionPlaceholder: "وصف مفصل للمنتج...",
//         requireImage: "⚠️ يا هندسة لازم ترفع صورة واحدة على الأقل للمنتج!",
//         addSuccess: "🎉 المنتج اتسيف بنجاح!",
//         editSuccess: "✅ المنتج اتعدل بنجاح!",
//         failedSend: "❌ حصلت مشكلة وأنا ببعت البيانات",
//         serverError: "⚠️ السيرفر مش بيرد",
//         fetchError: "فشل في تحميل بيانات المنتج",
//         errors: {
//           nameMin: "اسم المنتج لازم يكون حرفين على الأقل",
//           priceMin: "السعر لازم يكون أكبر من صفر",
//           descriptionMin: "الوصف لازم يكون مفصل شوية",
//           discountMin: "الخصم لازم يكون 0 أو أكبر",
//           discountMax: "الخصم مينفعش يكون أكبر من 100%",
//           stockMin: "المخزون لازم يكون صفر أو أكبر",
//           categoryRequired: "اختر فئة مناسبة للمنتج",
//         },
//       },
//       actions: {
//         confirmDelete: "هل أنت متأكد من حذف هذا المنتج؟",
//         deleted: "✅ المنتج اتمسح بنجاح!",
//         deleteFailed: "❌ فشل في حذف المنتج",
//         deleteError: "⚠️ حدث خطأ أثناء الحذف",
//       },
//     },
//     chat: {
//       greeting: "أهلاً بيك في كومود 👋",
//       helpText: "نقدر نساعدك في إيه النهاردة؟",
//       whatsapp: "دردشة عبر واتساب",
//       call: "اتصال هاتفي سريع",
//       connected: "نحن متصلون الآن لمساعدتك",
//     },
//   },
//   en: {
//     nav: {
//       shop: "Shop",
//       about: "Our Story",
//       admin: "Admin",
//       cart: "Cart",
//       switchLanguage: "عربي",
//     },
//     hero: {
//       button: "Shop Collection",
//     },
//     home: {
//       latestArrivals: "Latest Arrivals",
//       featuredPieces: "Featured Pieces",
//     },
//     latestProducts: {
//       loading: "Loading latest styles...",
//     },
//     categories: {
//       all: "All",
//       dining: "Dining",
//       sofas: "Sofas",
//       tables: "Tables",
//       console: "Console",
//     },
//     productCard: {
//       discountLabel: "Discount",
//       orderButton: "Request Customization",
//       removeFromCart: "Remove from cart",
//       addToCart: "Add to cart",
//       details: "View full details",
//       descriptionFallback:
//         "Modern design with premium materials, customization available.",
//       tag1: "Natural Wood",
//       tag2: "3-year Warranty",
//     },
//     addToCart: {
//       added: "Added!",
//       default: "Add to Cart",
//     },
//     cart: {
//       emptyTitle: "Your cart is empty",
//       emptyText: "Looks like you haven't added any pieces yet.",
//       browse: "Browse Products",
//       title: "Shopping Cart",
//       total: "Total:",
//       checkout: "Complete order via WhatsApp",
//       currency: "EGP",
//     },
//     productDetail: {
//       backToProducts: "Back to products",
//       orderButton: "Request customizations",
//       specialRequest:
//         "Hello Commode Furniture, I'd like to ask about this product:",
//       productLabel: "Product",
//       priceLabel: "Price",
//       customizationRequest:
//         "I'd like to customize the measurements/colors. Can you share more details?",
//       naturalWood: "Natural Wood",
//       warranty: "3-year Warranty",
//       fastDelivery: "Fast Delivery",
//     },
//     admin: {
//       sidebar: {
//         dashboard: "Dashboard",
//         products: "Products",
//         orders: "Orders",
//         customers: "Customers",
//         settings: "Settings",
//         addProduct: "Add Product",
//       },
//       header: {
//         title: "Commode Admin",
//       },
//       dashboard: {
//         overview: "Dashboard Overview",
//         welcome: "Welcome to your admin dashboard",
//         totalProducts: "Total Products",
//         totalOrders: "Total Orders",
//         totalRevenue: "Total Revenue",
//         totalCustomers: "Total Customers",
//         recentOrders: "Recent Orders",
//         noRecentOrders: "No recent orders to display.",
//         recentProducts: "Recent Products",
//         noProductsYet: "No products yet.",
//       },
//       products: {
//         management: "Products Management",
//         subtitle: "Manage your furniture products",
//         addProduct: "Add Product",
//         allProducts: "All Products",
//         noProductsFound: "No products found. Add your first product!",
//         table: {
//           image: "Image",
//           name: "Name",
//           category: "Category",
//           price: "Price",
//           actions: "Actions",
//         },
//       },
//       customers: {
//         management: "Customers Management",
//         subtitle: "View and manage your customers",
//         allCustomers: "All Customers",
//         comingSoon:
//           "Customer management functionality coming soon. No user authentication implemented yet.",
//       },
//       settings: {
//         title: "Settings",
//         subtitle: "Configure your store settings",
//         storeSettings: "Store Settings",
//         comingSoon:
//           "Settings panel coming soon. Configure store name, currency, shipping, etc.",
//       },
//       form: {
//         addProductTitle: "Add a new product for Commode 🛋️",
//         addProductSubtitle:
//           "Add a product and you'll be redirected to the products page after save.",
//         editProductTitle: "Edit Product",
//         back: "Back",
//         backToProducts: "Back to products",
//         productName: "Product Name",
//         price: "Price (EGP)",
//         discount: "Discount (%)",
//         category: "Product Category",
//         stock: "Stock",
//         description: "Description",
//         uploadImages: "Images",
//         uploadNewImage: "Upload a new image",
//         saveChanges: "Save Changes",
//         saveProduct: "Save Product",
//         productNamePlaceholder: "e.g. Classic Sofa",
//         descriptionPlaceholder: "Detailed product description...",
//         requireImage: "⚠️ You must upload at least one image for the product!",
//         addSuccess: "🎉 Product saved successfully!",
//         editSuccess: "✅ Product updated successfully!",
//         failedSend: "❌ There was a problem sending the data",
//         serverError: "⚠️ The server is not responding",
//         fetchError: "Failed to load product data",
//         errors: {
//           nameMin: "Product name must be at least 2 characters",
//           priceMin: "Price must be greater than zero",
//           descriptionMin: "Description needs more detail",
//           discountMin: "Discount must be 0 or greater",
//           discountMax: "Discount cannot exceed 100%",
//           stockMin: "Stock must be zero or greater",
//           categoryRequired: "Choose a valid product category",
//         },
//       },
//       actions: {
//         confirmDelete: "Are you sure you want to delete this product?",
//         deleted: "✅ Product deleted successfully!",
//         deleteFailed: "❌ Failed to delete the product",
//         deleteError: "⚠️ An error occurred while deleting",
//       },
//     },
//     chat: {
//       greeting: "Welcome to Commode 👋",
//       helpText: "How can we help today?",
//       whatsapp: "Chat on WhatsApp",
//       call: "Quick Call",
//       connected: "We are online and ready to help",
//     },
//   },
// };

// export function translate(path: string, locale: Locale) {
//   const keys = path.split(".");
//   let current: any = translations[locale];
//   for (const key of keys) {
//     if (!current || typeof current !== "object" || !(key in current)) {
//       return path;
//     }
//     current = current[key];
//   }
//   return typeof current === "string" ? current : path;
// }

// 1. تعريف اللغة الأساسية
export const defaultLocale = "ar";

// 2. كائن الترجمات الكبير (translations)
export const translations = {
  ar: {
    nav: {
      shop: "تسوق",
      about: "قصتنا",
      admin: "لوحة التحكم",
      cart: "السلة",
      delivered: "التسليمات",
      switchLanguage: "English",
    },
    hero: {
      button: "تسوق المجموعة",
    },
    home: {
      latestArrivals: "أحدث المنتجات",
      featuredPieces: "قطع مميزة",
    },
    latestProducts: {
      loading: "جاري تجهيز أحدث الموديلات...",
      gridView: "شبكة",
      listView: "عمودي",
    },
    categories: {
      all: "الكل",
      dining: "سفرة",
      sofas: "انتريهات",
      tables: "ترابيزات",
      console: "كونسول",
      lShapedSofa: "ركن",
      "L-Shaped Sofa": "ركن",
    },
    productCard: {
      discountLabel: "خصم",
      orderButton: "اطلب تعديلاتك",
      removeFromCart: "أزل من السلة",
      addToCart: "أضف للسلة",
      details: "عرض كامل التفاصيل",
      descriptionFallback:
        "تصميم عصري بخامات عالية الجودة، متاح تعديل المقاسات والألوان حسب طلبك.",
      tag1: "خشب طبيعي",
      tag2: "ضمان 3 سنوات",
      bestSeller: "الأكثر مبيعاً",
    },
    addToCart: {
      added: "تمت الإضافة!",
      default: "إضافة إلى السلة",
    },
    cart: {
      emptyTitle: "سلة المشتريات فارغة",
      emptyText: "يبدو أنك لم تضف أي قطع بعد.",
      browse: "تصفح المنتجات",
      title: "سلة المشتريات",
      total: "الإجمالي  :",
      checkout: "إتمام الطلب عبر واتساب",
      currency: "ج.م",
    },
    deliveredPage: {
      title: "اخر المنتجات التي تم تسليمها",
      subtitle:
        "نفخر بكوننا جزءاً من منازلكم. شاهد قطعنا الفنية في واقعها الجديد.",
      loading: "جاري تحميل اخر التسليمات... ",
      qualityGuaranteed: "ضمان الجودة",
      recentlyDelivered: "أحدث التسليمات",
      viewAllDeliveries: "عرض جميع التسليمات",
      deliveredStatus: "تم التسليم",
    },
    productDetail: {
      backToProducts: "العودة للمنتجات",
      orderButton: "اطلب تعديلاتك الخاصة",
      specialRequest: "أهلاً كومود، محتاج أستفسر عن المنتج ده:",
      productLabel: "المنتج",
      priceLabel: "السعر",
      customizationRequest: "حابب أعدل على المقاسات/الألوان، ممكن تفاصيل أكتر؟",
      naturalWood: "خشب طبيعي",
      warranty: "ضمان 3 سنوات",
      fastDelivery: "توصيل سريع",
    },
    admin: {
      sidebar: {
        dashboard: "لوحة التحكم",
        products: "المنتجات",
        orders: "الطلبات",
        customers: "العملاء",
        settings: "الإعدادات",
        addProduct: "أضف منتج",
      },
      header: {
        title: "إدارة كومود للأثاث",
      },
      dashboard: {
        overview: "نظرة عامة",
        welcome: "مرحباً بك في لوحة التحكم",
        totalProducts: "إجمالي المنتجات",
        totalOrders: "إجمالي الطلبات",
        totalRevenue: "إجمالي الإيرادات",
        totalCustomers: "إجمالي العملاء",
        recentOrders: "الطلبات الأخيرة",
        noRecentOrders: "لا توجد طلبات حديثة للعرض.",
        recentProducts: "المنتجات الأخيرة",
        noProductsYet: "لا توجد منتجات حتى الآن.",
      },
      products: {
        management: "إدارة المنتجات",
        subtitle: "تحكم في منتجات الأثاث بكل سهولة",
        addProduct: "أضف منتج",
        allProducts: "جميع المنتجات",
        noProductsFound: "لا توجد منتجات. أضف منتجك الأول!",
        table: {
          image: "الصورة",
          name: "الاسم",
          category: "الفئة",
          price: "السعر",
          actions: "الإجراءات",
        },
      },
      customers: {
        management: "إدارة العملاء",
        subtitle: "عرض وإدارة بيانات العملاء",
        allCustomers: "جميع العملاء",
        comingSoon: "قريباً: إدارة العملاء.",
      },
      settings: {
        title: "الإعدادات",
        subtitle: "اضبط إعدادات المتجر",
        storeSettings: "إعدادات المتجر",
        comingSoon: "لوحة الإعدادات قيد التطوير.",
      },
      form: {
        addProductTitle: "إضافة منتج جديد لـ كومود 🛋️",
        addProductSubtitle:
          "أضف منتج جديد وسيتم تحويلك إلى صفحة المنتجات بعد الحفظ.",
        editProductTitle: "تعديل المنتج",
        back: "رجوع",
        backToProducts: "العودة للمنتجات",
        productNameAr: "اسم المنتج بالعربية",
        productNameEn: "اسم المنتج بالإنجليزية",
        price: "السعر (جنية)",
        discount: "نسبة الخصم (%)",
        category: "فئة المنتج",
        stock: "المخزون",
        descriptionAr: "الوصف بالعربية",
        descriptionEn: "الوصف بالإنجليزية",
        description: "الوصف",
        uploadImages: "الصور",
        uploadNewImage: "رفع صورة جديدة",
        saveChanges: "حفظ التعديلات",
        saveProduct: "حفظ المنتج",
        productNamePlaceholder: "مثلاً: صالون كلاسيك",
        descriptionPlaceholder: "وصف مفصل للمنتج...",
        requireImage: "⚠️ يا هندسة لازم ترفع صورة واحدة على الأقل للمنتج!",
        addSuccess: "🎉 المنتج اتسيف بنجاح!",
        editSuccess: "✅ المنتج اتعدل بنجاح!",
        failedSend: "❌ حصلت مشكلة وأنا ببعت البيانات",
        serverError: "⚠️ السيرفر مش بيرد",
        fetchError: "فشل في تحميل بيانات المنتج",
        errors: {
          nameMin: "اسم المنتج لازم يكون حرفين على الأقل",
          priceMin: "السعر لازم يكون أكبر من صفر",
          descriptionMin: "الوصف لازم يكون مفصل شوية",
          discountMin: "الخصم لازم يكون 0 أو أكبر",
          discountMax: "الخصم مينفعش يكون أكبر من 100%",
          stockMin: "المخزون لازم يكون صفر أو أكبر",
          categoryRequired: "اختر فئة مناسبة للمنتج",
        },
      },
      actions: {
        confirmDelete: "هل أنت متأكد من حذف هذا المنتج؟",
        deleted: "✅ المنتج اتمسح بنجاح!",
        deleteFailed: "❌ فشل في حذف المنتج",
        deleteError: "⚠️ حدث خطأ أثناء الحذف",
      },
    },
    chat: {
      greeting: "أهلاً بيك في كومود 👋",
      helpText: "نقدر نساعدك في إيه النهاردة؟",
      whatsapp: "دردشة عبر واتساب",
      call: "اتصال هاتفي سريع",
      connected: "نحن متصلون الآن لمساعدتك",
    },
  },
  en: {
    // ... (نفس التقسيمة الإنجليزية اللي كانت موجودة)
    nav: {
      shop: "Shop",
      about: "Our Story",
      admin: "Admin",
      cart: "Cart",
      delivered: "Delivered",
      switchLanguage: "عربي",
    },
    hero: {
      button: "Shop Collection",
    },
    home: {
      latestArrivals: "Latest Arrivals",
      featuredPieces: "Featured Pieces",
    },
    latestProducts: {
      loading: "Loading latest styles...",
      gridView: "Grid",
      listView: "List",
    },
    categories: {
      all: "All",
      dining: "Dining",
      sofas: "Sofas",
      lShapedSofa: "L-Shaped Sofa",
      "L-Shaped Sofa": "L-Shaped Sofa",
      tables: "Tables",
      console: "Console",

    },
    productCard: {
      discountLabel: "Discount",
      orderButton: "Request Customization",
      removeFromCart: "Remove from cart",
      addToCart: "Add to cart",
      details: "View full details",
      descriptionFallback:
        "Modern design with premium materials, customization available.",
      tag1: "Natural Wood",
      tag2: "3-year Warranty",
      bestSeller: "Best Seller",
    },
    addToCart: {
      added: "Added!",
      default: "Add to Cart",
    },
    cart: {
      emptyTitle: "Your cart is empty",
      emptyText: "Looks like you haven't added any pieces yet.",
      browse: "Browse Products",
      title: "Shopping Cart",
      total: "Total  :",
      checkout: "Complete order via WhatsApp",
      currency: "EGP",
    },
    deliveredPage: {
      title: "last delivered products",
      subtitle:
        "We are proud to be part of your homes. See our artistic pieces in their new reality.",
      loading: "Loading last deliveries ...",
      qualityGuaranteed: "Quality Guaranteed",
      recentlyDelivered: "Recently Delivered",
      viewAllDeliveries: "View All Deliveries",
      deliveredStatus: "Delivered",
    },
    productDetail: {
      backToProducts: "Back to products",
      orderButton: "Request customizations",
      specialRequest:
        "Hello Commode Furniture, I'd like to ask about this product:",
      productLabel: "Product",
      priceLabel: "Price",
      customizationRequest:
        "I'd like to customize the measurements/colors. Can you share more details?",
      naturalWood: "Natural Wood",
      warranty: "3-year Warranty",
      fastDelivery: "Fast Delivery",
    },
    admin: {
      sidebar: {
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
        customers: "Customers",
        settings: "Settings",
        addProduct: "Add Product",
      },
      header: {
        title: "Commode Admin",
      },
      dashboard: {
        overview: "Overview",
        welcome: "Welcome to Dashboard",
        totalProducts: "Total Products",
        totalOrders: "Total Orders",
        totalRevenue: "Total Revenue",
        totalCustomers: "Total Customers",
        recentOrders: "Recent Orders",
        noRecentOrders: "No recent orders.",
        recentProducts: "Recent Products",
        noProductsYet: "No products yet.",
      },
      products: {
        management: "Product Management",
        subtitle: "Manage your products easily",
        addProduct: "Add Product",
        allProducts: "All Products",
        noProductsFound: "No products found.",
        table: {
          image: "Image",
          name: "Name",
          category: "Category",
          price: "Price",
          actions: "Actions",
        },
      },
      customers: {
        management: "Customer Management",
        subtitle: "View customer data",
        allCustomers: "All Customers",
        comingSoon: "Coming Soon: Customer Management.",
      },
      settings: {
        title: "Settings",
        subtitle: "Adjust store settings",
        storeSettings: "Store Settings",
        comingSoon: "Settings panel under development.",
      },
      form: {
        addProductTitle: "Add New Product for Commode 🛋️",
        addProductSubtitle:
          "Add a product and you'll be redirected after saving.",
        editProductTitle: "Edit Product",
        back: "Back",
        backToProducts: "Back to Products",
        productNameAr: "Product Name (Arabic)",
        productNameEn: "Product Name (English)",
        price: "Price (EGP)",
        discount: "Discount (%)",
        category: "Category",
        stock: "Stock",
        descriptionAr: "Description (Arabic)",
        descriptionEn: "Description (English)",
        description: "Description",
        uploadImages: "Images",
        uploadNewImage: "Upload Image",
        saveChanges: "Save Changes",
        saveProduct: "Save Product",
        productNamePlaceholder: "e.g. Classic Salon",
        descriptionPlaceholder: "Detailed description...",
        requireImage: "⚠️ You must upload at least one image!",
        addSuccess: "🎉 Product saved successfully!",
        editSuccess: "✅ Product updated successfully!",
        failedSend: "❌ Failed to send data",
        serverError: "⚠️ Server not responding",
        fetchError: "Failed to load product data",
        errors: {
          nameMin: "Name must be at least 2 characters",
          priceMin: "Price must be greater than zero",
          descriptionMin: "Description needs more detail",
          discountMin: "Discount must be 0 or more",
          discountMax: "Discount cannot exceed 100%",
          stockMin: "Stock must be 0 or more",
          categoryRequired: "Select a category",
        },
      },
      actions: {
        confirmDelete: "Are you sure you want to delete this product?",
        deleted: "✅ Product deleted!",
        deleteFailed: "❌ Delete failed",
        deleteError: "⚠️ Error during deletion",
      },
    },
    chat: {
      greeting: "Welcome to Commode 👋",
      helpText: "How can we help you today?",
      whatsapp: "WhatsApp Chat",
      call: "Quick Call",
      connected: "We are online to help you",
    },
  },
};

// 3. دالة البحث (The Logic)
export function translate(path, locale) {
  // بنحول الـ "nav.shop" لمصفوفة ["nav", "shop"]
  const keys = path.split(".");

  // بنبدأ البحث من لغة المستخدم الحالية
  let current = translations[locale];

  // بنمشي جوه الـ Object مفتاح بمفتاح
  for (const key of keys) {
    if (!current || typeof current !== "object" || !(key in current)) {
      // لو ملقتش المفتاح، رجع الـ path نفسه عشان المطور يعرف إن فيه غلط
      return path;
    }
    current = current[key];
  }

  // لو النتيجة نص رجعها، لو لسه Object (يعني الـ path غير مكتمل) رجع الـ path
  return typeof current === "string" ? current : path;
}
