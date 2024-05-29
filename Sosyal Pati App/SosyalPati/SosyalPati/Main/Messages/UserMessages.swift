import SwiftUI

struct UserMessages: View {
    @State private var users: [ChatUser] = [
        ChatUser(name: "Umut Yılmaz", lastMessage: "Eminim çok iyi anlaşacaklar!", imageName: "pp1", time: "3 dk"),
        ChatUser(name: "Alper Han Uyanık", lastMessage: "Eminim çok iyi anlaşacaklar!", imageName: "pp2", time: "45 dk"),
        ChatUser(name: "Mete Yağcı", lastMessage: "Eminim çok iyi anlaşacaklar!", imageName: "pp3", time: "45 dk"),
        
    ]
    
    var body: some View {
        NavigationView {
            VStack {
                List(users) { user in
                    NavigationLink(destination: MessageDetailView(user: user)) {
                        HStack {
                            Image(user.imageName)
                                .resizable()
                                .frame(width: 50, height: 50)
                                .clipShape(Circle())
                                .padding(.trailing, 10)
                            
                            VStack(alignment: .leading) {
                                Text(user.name)
                                    .font(.headline)
                                Text(user.lastMessage)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            
                            Spacer()
                            
                            VStack {
                                Text(user.time)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                if user.time == "3 dk" || user.time == "Pazartesi" {
                                    Circle()
                                        .fill(Color.purple)
                                        .frame(width: 20, height: 20)
                                        .overlay(
                                            Text("3")
                                                .foregroundColor(.white)
                                                .font(.footnote)
                                        )
                                }
                            }
                        }
                    }
                }
                .listStyle(PlainListStyle())
            }
            .navigationTitle("Mesajlar")
        }
    }
}

struct UserMessages_Previews: PreviewProvider {
    static var previews: some View {
        UserMessages()
    }
}
