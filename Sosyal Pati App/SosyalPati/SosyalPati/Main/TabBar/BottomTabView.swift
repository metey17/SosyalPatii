

import SwiftUI

struct BottomTabView: View {
    var body: some View {
        TabView{
            ExploreView()
                .tabItem { Label("Anasayfa", systemImage: "house") }
            UserMessages()
                .tabItem { Label("Mesajlar", systemImage: "message") }
            LoginView()
                .tabItem { Label("Profil", systemImage: "person") }
            NearestVet()
                .tabItem { Label("Veteriner", systemImage: "cross.vial") }
            AboutUsView()
                .tabItem { Label("Hakkımızda", systemImage: "info.circle") }
            LikedView()
                .tabItem { Label("Beğendiklerim", systemImage: "heart") }
            
            
            
        }
        
    }
}

#Preview {
    BottomTabView()
}
