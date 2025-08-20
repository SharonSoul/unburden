# Unburden - Safe, Anonymous Peer Support

A privacy-first, judgment-free web application where people can share what they can't say elsewhere and get peer support around addiction and recovery.

## 🌟 Features

### Core Functionality (MVP)
- **Anonymous Participation**: Guest posting, pseudonyms, and no camera by default
- **Cove Circles**: Topic-based support spaces for specific addictions and struggles
- **Live Sessions**: Real-time chat with guided, open, and share session types
- **Journal System**: Local-first private reflections with optional cloud sync
- **Crisis Support**: Immediate help resources and crisis intervention
- **Moderation Tools**: AI-assisted content filtering and human moderation

### Safety & Privacy Features
- **Quick Hide**: One-click panic exit to neutral content
- **Trigger Filters**: Automatic content blurring for sensitive topics
- **Data Retention Control**: User-configurable retention periods (7/30/90 days)
- **Anonymous by Default**: No forced signup required
- **Ephemeral Storage**: Configurable message expiration

### User Experience
- **Modern UI**: Sleek, calming design with smooth animations
- **Responsive Design**: Works seamlessly across all devices
- **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation
- **Internationalization Ready**: Built for multilingual support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unburden
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
unburden/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Landing page
│   ├── coves/             # Cove Circles pages
│   ├── journal/           # Journal functionality
│   └── resources/         # Resources and support
├── components/             # Reusable UI components
│   ├── Header.tsx         # Navigation and crisis button
│   ├── CircleCard.tsx     # Individual circle display
│   └── JoinModal.tsx      # Join flow modal
├── data/                   # Seed data and mock content
│   └── seedData.ts        # Cove Circles and resources
├── lib/                    # Utility functions
│   └── utils.ts           # Helper functions
├── types/                  # TypeScript type definitions
│   └── index.ts           # Application interfaces
└── public/                 # Static assets
```

## 🎨 Design System

### Color Palette
- **Deep Navy** (#0F1A2B) - Background
- **Soft Slate** (#2A3650) - Surfaces
- **Mist** (#E7ECF3) - Text and borders
- **Seafoam** (#92C9C1) - Positive actions
- **Coral** (#FF826E) - Calls to action
- **Sand** (#F4E6D4) - Highlights

### Typography
- **Font Family**: Inter (Humanist sans-serif)
- **Base Size**: 16-18px
- **Line Height**: Generous for readability

### Components
- **Cards**: 16-24px border radius with gentle shadows
- **Buttons**: Large, clear with hover states
- **Focus Rings**: Seafoam focus indicators
- **Animations**: Subtle, calming transitions

## 🔧 Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Type Safety**: TypeScript for robust development
- **State Management**: React hooks and local storage

## 📱 Pages & Routes

### Public Pages
- **`/`** - Landing page with hero, features, and CTAs
- **`/coves`** - Directory of all Cove Circles with search/filters
- **`/coves/[slug]`** - Individual circle details and join flow
- **`/resources`** - Crisis support, articles, and guidelines
- **`/journal`** - Private journaling (local-first)
- **`/guidelines`** - Community rules and safety
- **`/privacy`** - Privacy policy and data handling
- **`/terms`** - Terms of service

### Protected Pages (Future)
- **`/profile`** - User settings and preferences
- **`/mod`** - Moderator console and tools
- **`/session/[id]`** - Live chat sessions

## 🚧 Current Status

### ✅ Completed
- Complete UI implementation across all pages
- Responsive design with mobile-first approach
- Smooth animations and micro-interactions
- Component library with consistent design
- Mock data and seed content
- Accessibility features and keyboard navigation

### 🔄 In Progress
- Authentication system
- Real-time chat functionality
- Backend API development
- Database integration

### 📋 Planned
- WebSocket implementation for live sessions
- AI-powered content moderation
- Push notifications
- Multilingual support
- Mobile app development

## 🎯 Key Features Implementation

### Join Flow
The four-step join process includes:
1. **Anonymous Toggle**: Choose between anonymous or pseudonym display
2. **Guidelines**: Accept community rules and safety guidelines
3. **Session Type**: Select open, guided, or share sessions
4. **Trigger Filters**: Optional content filtering preferences

### Crisis Support
- **Persistent Crisis Button**: Always visible in header
- **Region Selector**: Location-based resource recommendations
- **Immediate Help Options**: Hotlines and crisis resources
- **Crisis Sheet**: Guided intervention for high-risk situations

### Journal System
- **Local-First Storage**: Entries stored in browser localStorage
- **Quick Prompts**: AI-suggested writing prompts
- **Export Functionality**: Download entries as text files
- **Cloud Sync Ready**: Infrastructure for future account integration

## 🔒 Privacy & Security

### Data Handling
- **No PII Collection**: Minimal data collection by design
- **Ephemeral Storage**: Configurable message retention
- **Local-First**: Journal entries stored locally by default
- **Anonymous Sessions**: Full participation without signup

### Content Moderation
- **AI-Assisted Triage**: Automatic flagging of sensitive content
- **Human Oversight**: Trained moderators review flagged content
- **Escalation Flow**: Crisis intervention for high-risk situations
- **Rate Limiting**: Protection against spam and abuse

## 🌍 Accessibility

### Standards Compliance
- **WCAG 2.2 AA**: Full accessibility compliance
- **Keyboard Navigation**: Complete keyboard-only operation
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast**: Optimized for visual accessibility
- **Reduced Motion**: Respects user motion preferences

### Inclusive Design
- **Clear Language**: Simple, stigma-aware copy
- **Multiple Input Methods**: Mouse, keyboard, and touch support
- **Flexible Layouts**: Responsive design for all screen sizes
- **Error Handling**: Clear feedback and recovery options

## 🚀 Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000

# External Services
CRISIS_API_KEY=your_crisis_api_key
MODERATION_API_KEY=your_moderation_api_key
```

### Build Commands
```bash
# Development
npm run dev

# Production Build
npm run build
npm start

# Linting
npm run lint
```

## 🤝 Contributing

### Development Guidelines
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the design system** and existing patterns
4. **Test thoroughly** across different devices and browsers
5. **Submit a pull request** with clear description

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Component Testing**: Test all interactive elements
- **Accessibility**: Ensure WCAG compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Crisis Resources
If you're in crisis, please use the crisis button in the app header or contact:
- **US**: 988 (Suicide & Crisis Lifeline)
- **Canada**: 1-833-456-4566 (Crisis Services Canada)
- **Emergency**: 911 (or your local emergency number)

### Technical Support
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions and ideas
- **Security**: Report security issues privately to maintainers

## 🙏 Acknowledgments

- **Recovery Community**: For insights and feedback on peer support needs
- **Mental Health Professionals**: For guidance on safety and crisis intervention
- **Open Source Community**: For the amazing tools and libraries used
- **Design Community**: For inspiration and best practices

---

**Remember**: Unburden is a peer support platform, not a substitute for professional medical care. If you're experiencing a crisis, please seek immediate professional help.
