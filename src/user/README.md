# 🎯 User Customization Hub

Welcome to the **user** folder - your one-stop location for all customizations when you fork the AI CMS repo!

## 📁 Folder Structure

```
user/
├── components/         # 🎨 Your custom components
├── extensions/         # 🔧 Advanced customizations
└── translations/       # 🌍 Multi-language support
```

## 🎨 Components (`user/components/`)

### Current Structure
```
components/
├── layout/     # Navigation, headers, footers
├── content/    # Content blocks, grids, sections  
├── forms/      # Contact forms, newsletters
├── ecommerce/  # Product cards, shopping components
├── social/     # Social sharing, widgets
└── [your-new-folder]/ # Create unlimited folders!
```

### Adding New Components
```jsx
// user/components/my-feature/MyComponent.jsx
import React from 'react'

const MyComponent = ({ title, ...props }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
    </div>
  )
}

export default MyComponent
```

### Using in JSON
```json
{
  "components": [
    {
      "type": "MyComponent",
      "title": "Hello World!"
    }
  ]
}
```

## 🔧 Extensions (`user/extensions/`)

Advanced customizations for power users:

### Configuration (`extensions/config/`)
- **Theme settings** - Colors, fonts, spacing
- **Global configuration** - Site-wide settings
- **Feature toggles** - Enable/disable functionality

### Custom Hooks (`extensions/hooks/`)
- **API integrations** - Connect to external services  
- **Data fetching** - Custom data loading logic
- **State management** - Custom React hooks

### Extension Components (`extensions/components/`)
- **Advanced components** - Complex custom components
- **Third-party integrations** - External service components
- **Experimental features** - Test new functionality

## 🌍 Translations (`user/translations/`)

Multi-language support for your site:

### Supported Languages
- **English** (`en.js`) - Default language
- **Spanish** (`es.js`) - Español  
- **French** (`fr.js`) - Français
- **German** (`de.js`) - Deutsch
- **Portuguese** (`pt.js`) - Português

### Adding New Languages
```javascript
// user/translations/your-language.js
export default {
  common: {
    loading: 'Your translation...',
    error: 'Your translation...',
  },
  navigation: {
    home: 'Your translation...',
    about: 'Your translation...',
  }
}
```

### Using Translations
```jsx
import { t } from '../user/translations'

const MyComponent = () => {
  return <h1>{t('common.welcome')}</h1>
}
```

## ✅ Best Practices

### File Organization
- **Group related items** in the same folder
- **Use descriptive names** for components and files
- **Keep folders focused** - don't mix unrelated functionality

### Component Development
- **Accept props** for customization
- **Use Tailwind CSS** for consistent styling
- **Follow React best practices** for performance

### Naming Conventions
- **PascalCase** for component names (`MyComponent`)
- **camelCase** for functions and variables
- **kebab-case** for folder names (`my-feature`)

## 🚫 What NOT to Modify

Don't modify these core folders:
- `twaa-renderer/core/` - Core renderer engine
- `twaa-renderer/components/admin/` - Admin tools  
- `twaa-renderer/components/ui/` - Core UI components
- `twaa-renderer/services/` - Core services

## 🎯 Fork Workflow

When you fork this repo:

1. **Clone your fork**
2. **Customize** files in the `user/` folder only
3. **Test** your changes locally  
4. **Deploy** your customized AI CMS
5. **Contribute back** improvements to the main repo (optional)

## 📖 Examples

Check existing files for examples:
- `components/layout/Navigation.jsx` - Complex navigation
- `extensions/config/userConfig.js` - Theme configuration
- `translations/en.js` - English translations

## 🆘 Need Help?

- **Documentation**: Check the main README.md
- **Examples**: Look at existing components in each folder  
- **Issues**: Create GitHub issues for questions
- **Community**: Join our discussions

Happy customizing! 🚀
