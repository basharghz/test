import React from 'react'

const ProductGrid = ({ 
  title, 
  subtitle,
  products = [],
  columns = 3,
  showPricing = true,
  buttonText = "Add to Cart"
}) => (
  <div id="products-grid" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>}
          {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                {showPricing && <span className="text-2xl font-bold text-blue-600">{product.price}</span>}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  {product.buttonText || buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

ProductGrid.schema = {
  role: ["product_grid", "ecommerce_section", "product_showcase"],
  props: {
    title: { tags: ["headline", "main_text"], optional: true },
    subtitle: { tags: ["description_text", "paragraph"], optional: true },
    columns: { 
      type: "number", 
      tags: ["grid_columns"], 
      options: [2, 3, 4],
      default: 3,
      optional: true 
    },
    showPricing: { 
      type: "boolean", 
      tags: ["show_pricing"], 
      default: true,
      optional: true 
    },
    buttonText: { 
      type: "string", 
      tags: ["cta_button_text"], 
      default: "Add to Cart",
      optional: true 
    },
    products: {
      type: "array",
      tags: ["product_list", "items"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"] },
        name: { type: "string", tags: ["product_name", "item_title"] },
        description: { type: "string", tags: ["product_description"] },
        price: { type: "string", tags: ["product_price"], optional: true },
        image: { type: "string", tags: ["product_image"] },
        buttonText: { type: "string", tags: ["custom_button_text"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "Our Products",
      subtitle: "Discover our range of high-quality products",
      columns: 3,
      showPricing: true,
      buttonText: "Add to Cart",
      products: [
        {
          id: "1",
          name: "Premium Headphones",
          description: "High-quality wireless headphones with noise cancellation",
          price: "$299",
          image: "/images/products/headphones.jpg"
        },
        {
          id: "2",
          name: "Smart Watch",
          description: "Advanced fitness tracking and smart notifications",
          price: "$399",
          image: "/images/products/smartwatch.jpg"
        },
        {
          id: "3",
          name: "Laptop Stand",
          description: "Ergonomic aluminum laptop stand for better posture",
          price: "$79",
          image: "/images/products/laptop-stand.jpg"
        }
      ]
    }
  ]
}

export default ProductGrid
