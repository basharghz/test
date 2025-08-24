# 🎯 Custom Components

Welcome to the **custom components** folder! This is where you add your own components when you fork the AI CMS repo.

## 📁 Current Structure

```
custom/
├── layout/     # Navigation, headers, footers
├── content/    # Content blocks, grids, sections
├── forms/      # Contact forms, newsletters, inputs
├── ecommerce/  # Product cards, shopping components
├── social/     # Social sharing, social widgets
└── [your-new-folder]/ # Create unlimited new folders!
```

## 🚀 Adding New Components

### 1. Choose or Create a Folder
```bash
# Use existing folder
cd custom/layout

# Or create new folder
mkdir custom/my-feature
cd custom/my-feature
```

### 2. Create Your Component
```jsx
// YourComponent.jsx
import React from 'react'

const YourComponent = ({ title, description, ...props }) => {
  return (
    <div className="your-component">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default YourComponent
```

### 3. Use in JSON
```json
{
  "components": [
    {
      "type": "YourComponent",
      "title": "My Custom Component",
      "description": "This is my custom component!"
    }
  ]
}
```

## ✅ Best Practices

### Component Naming
- Use **PascalCase** for component names (e.g., `MyComponent`)
- Make names **descriptive** (e.g., `ProductCard` not `Card`)
- Avoid conflicts with existing components

### Folder Organization
- **Group related components** in the same folder
- **Create new folders** for major features
- **Keep folders focused** - don't mix unrelated components

### Props Design
- Accept `className` prop for styling customization
- Use **destructuring** with `...props` for flexibility
- Provide **default values** for optional props

## 🔒 Core Components (Don't Modify)

- `admin/` - CMS admin tools and dashboards
- `ui/` - Error pages, loading states, core UI

These folders contain core CMS functionality. Modify only if you're contributing back to the main project.

## 🎨 Styling

Components automatically have access to:
- **Tailwind CSS** classes
- **CSS modules** (if you prefer)
- **Global styles** from the main app

## 📖 Examples

Check existing components in each folder for examples:
- `layout/Navigation.jsx` - Complex navigation with mobile menu
- `content/ProductGrid.jsx` - Grid layout with responsive design
- `forms/ContactForm.jsx` - Form handling with validation
- `ecommerce/ProductCard.jsx` - Card component with actions
- `social/SocialShare.jsx` - Social sharing with multiple platforms

Happy coding! 🚀
