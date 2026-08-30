# Insightst Design

An Insightst UI component library.

## Technology Stack

- **React 19**: Component development and application rendering
- **TypeScript**: Type-safe development across the monorepo
- **Vite**: Development server and production bundling for the docs site and playground
- **Ant Design**: Base UI components and interaction patterns
- **Tailwind CSS**: Utility-first styling for the documentation site
- **Three.js**: 3D rendering and visualization support
- **3d-force-graph**: 3D force-directed graph visualization
- **Leaflet + React Leaflet**: Interactive map components and map drawing
- **React Router**: Routing for the documentation site and reusable components
- **npm Workspaces + Turborepo**: Monorepo package management and task orchestration
- **Changesets**: Versioning and publishing workflow for packages

## Example

![Components example](./example.jpg)

## Structure

- `apps/docs`: Component documentation site (runs on port 3000)
- `apps/playground`: React playground for testing components (runs on port 3001)
- `packages/ui`: The main UI component library
- `packages/theme`: Design tokens and theme configuration
- `packages/icons`: Icon library (wrapping lucide-react)
- `packages/hooks`: Shared React hooks
- `packages/utils`: Helper functions

## Commands

- `npm run dev`: Develop and test components
- `npm run docs`: Run the component documentation site (port 3000)
- `npm run build`: Build the component packages
- `npm run clean`: Remove build artifacts

## Publishing

- `npm adduser`: Create an npm user account
- `npm install -D @changesets/cli`: Install Changesets for automated releases without manually updating version numbers
- `npx changeset init`: Initialize Changesets
- `npx changeset`: Start the versioning workflow after changing the source code
- `npx changeset version`: Update package versions
- `npm login`: Log in to npm
- `npx changeset publish`: Publish the packages to npm
