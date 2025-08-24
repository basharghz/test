// Schema helper for component definitions
export const defineSchema = (componentName, schema) => {
  return {
    componentName,
    ...schema
  }
}
