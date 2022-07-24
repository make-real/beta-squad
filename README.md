> 21 - Jun - 2022

# Space Clone | [Live Link](https://space-clone-bd.netlify.app)


## Yarn | Project Dependencies...
|No| Package Installs               | Usage for                                 |
|--|--------------------------------|-------------------------------------------|
| 1| yarn add `react-route-dom`     | Declarative routing in react web app      |
| 2| yarn add `react-icons`         | Icon pack for interactive UI building     |
| 3| yarn add `axios`               | Data fetching from backend                |
| 4| yarn add `-D` `tailwindcss postcss autoprefixer` | `devDependency` of TailwindCSS for building UI  |
| 5| yarn add `@tippyjs/react`          | Tool tip for extra little info at UI  |
| 6| yarn add `@giphy/react-components` | GIF for chatting UI                   |

 
### [React Icons | Web Link][link]
[link]: https://react-icons.github.io/react-icons


## Project Folder & File Structure 
```jsx

    ├───public
    │   ├───heySpace.ico
    │   ├───index.html
    │   └───_redirects
    │
    ├───src
    │   ├───App.js
    │   ├───index.js
    │   ├───assets
    │   │   ├───icons
    │   │   │   ├───svg
    │   │   │   │   ├───Addons.jsx
    │   │   │   │   ├───ArrowLeft.jsx
    │   │   │   │   ├───ArrowRight.jsx
    │   │   │   │   ├───Attachment.jsx
    │   │   │   │   ├───AtTheRate.jsx
    │   │   │   │   ├───Bell.jsx
    │   │   │   │   ├───Calendar.jsx
    │   │   │   │   ├───CheckList.jsx
    │   │   │   │   ├───Close.jsx
    │   │   │   │   ├───CloseMenuBtn.jsx
    │   │   │   │   ├───Copy.jsx
    │   │   │   │   ├───Delete.jsx
    │   │   │   │   ├───Description.jsx
    │   │   │   │   ├───DotsDouble.jsx
    │   │   │   │   ├───DotsSingle.jsx
    │   │   │   │   ├───EditPen.jsx
    │   │   │   │   ├───Eye.jsx
    │   │   │   │   ├───EyeOpen.jsx
    │   │   │   │   ├───Folder.jsx
    │   │   │   │   ├───GIF.jsx
    │   │   │   │   ├───LinkingChain.jsx
    │   │   │   │   ├───LogoRed.jsx
    │   │   │   │   ├───LogOut.jsx
    │   │   │   │   ├───Mobile.jsx
    │   │   │   │   ├───OpenMenuBtn.jsx
    │   │   │   │   ├───OverWatch.jsx
    │   │   │   │   ├───Plus.jsx
    │   │   │   │   ├───RightArrow.jsx
    │   │   │   │   ├───RightOK.jsx
    │   │   │   │   ├───Search.jsx
    │   │   │   │   ├───Settings.jsx
    │   │   │   │   ├───Smile.jsx
    │   │   │   │   ├───SMS.jsx
    │   │   │   │   ├───SpaceLogoLock.jsx
    │   │   │   │   ├───SpaceLogo.jsx
    │   │   │   │   ├───Subscription.jsx
    │   │   │   │   ├───Tag.jsx
    │   │   │   │   ├───Task.jsx
    │   │   │   │   └───UserPlus.jsx
    │   │   │   │   
    │   │   │   └───index.js
    │   │   │
    │   │   ├───images
    │   │   │   ├───defaultList.png
    │   │   │   ├───haySpace.png
    │   │   │   ├───Mahbub.jpg
    │   │   │   ├───makeReal.png
    │   │   │   └───user.jpg
    │   │   │
    │   │   ├───index.js
    │   │   ├───loginPage.png
    │   │   ├───logo.png
    │   │   ├───remoteCamp.png
    │   │   ├───signIn1.png
    │   │   ├───signIn2.png
    │   │   ├───timeCamp.png
    │   │   └───userLogin.png
    │   │
    │   ├───components
    │   │   ├───AddCard.jsx
    │   │   ├───AddCardButton.jsx
    │   │   ├───AddCardMini.jsx
    │   │   ├───Calender.jsx
    │   │   ├───index.js
    │   │   ├───List.jsx
    │   │   ├───Timeline.jsx
    │   │   │
    │   │   ├───Board
    │   │   │   ├───Board.jsx
    │   │   │   ├───BoardActionDropDown.jsx
    │   │   │   └───BoardModal.jsx
    │   │   │
    │   │   ├───Chat
    │   │   │   ├───Chat.jsx
    │   │   │   ├───GIF.jsx
    │   │   │   ├───MessageBox.jsx
    │   │   │   └───TextMessage.jsx
    │   │   │
    │   │   ├───Layout
    │   │   │   ├───Layout.js
    │   │   │   └───UserSettingLayout.jsx
    │   │   │
    │   │   ├───LoginRegistration
    │   │   │   ├───Login.jsx
    │   │   │   └───Register.jsx
    │   │   │
    │   │   ├───Navbar
    │   │   │   ├───AddOn.jsx
    │   │   │   ├───Members.jsx
    │   │   │   ├───NavBar.jsx
    │   │   │   └───Setting.jsx
    │   │   │
    │   │   ├───Sidebar
    │   │   │   ├───CreateSpace.jsx
    │   │   │   ├───NewWorkspace.jsx
    │   │   │   ├───NotificationBell.jsx
    │   │   │   ├───NotificationSMS.jsx
    │   │   │   ├───SideBar.jsx
    │   │   │   └───UserSettingsDropDown.jsx
    │   │   │
    │   │   └───UserSettings
    │   │       ├───DeveloperConsole.jsx
    │   │       ├───ManageWorkspace.jsx
    │   │       ├───Preferences.jsx
    │   │       ├───Profile.jsx
    │   │       └───UserSettings.jsx
    │   │
    │   ├───constant
    │   │   ├───data.js
    │   │   └───users.js
    │   │
    │   ├───context
    │   │   ├───BoardCardContext.js
    │   │   └───StyleContext.js
    │   │
    │   ├───hooks
    │   │   └───useFetch.js
    │   │
    │   ├───style
    │   │   └───index.css
    │   │
    │   └───util
    │       └───fetchUserToken.js
    │
    ├───.gitignore
    ├───package-lock.json
    ├───package.json
    ├───postcss.config.js
    ├───README.md
    ├───tailwind.config.js
    └───yarn.lock
    
```