import SwiftUI

struct MessageDetailView: View {
    let user: ChatUser
    @State private var messages: [Message] = [
        Message(text: "Selam, kediniz çok tatlı. Göründüğü gibi uysal mı?", isSentByCurrentUser: false, imageName: "pp1"),
        Message(text: "Evet fazlasıyla uysal ve çok oyuncu, sizin kediniz nasıl?", isSentByCurrentUser: true, imageName: "pp2"),
        Message(text: "Benim kedim de fazlasıyla uysal ve oyuncu", isSentByCurrentUser: false, imageName: "pp1"),
        Message(text: "Süper! En kısa sürede kedilerimizi tanıştırmalıyız", isSentByCurrentUser: true, imageName: "pp2"),
        Message(text: "Eminim çok iyi anlaşacaklar!", isSentByCurrentUser: false, imageName: "pp1")
    ]
    @State private var newMessage: String = ""
    
    var body: some View {
        VStack {
            HStack {
                Image(user.imageName)
                    .resizable()
                    .frame(width: 50, height: 50)
                    .clipShape(Circle())
                VStack(alignment: .leading) {
                    Text(user.name)
                        .font(.headline)
                    Text("Çevrimiçi")
                        .font(.subheadline)
                        .foregroundColor(.green)
                }
                Spacer()
                
            }
            .padding()
            .background(Color.black)
            .foregroundColor(.white)

            List(messages) { message in
                HStack {
                    if message.isSentByCurrentUser {
                        Spacer()
                        Text(message.text)
                            .padding()
                            .background(Color.black)
                            .cornerRadius(10)
                            .foregroundColor(.white)
                        Image(message.imageName)
                            .resizable()
                            .frame(width: 30, height: 30)
                            .clipShape(Circle())
                    } else {
                        Image(message.imageName)
                            .resizable()
                            .frame(width: 30, height: 30)
                            .clipShape(Circle())
                        Text(message.text)
                            .padding()
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(10)
                            .foregroundColor(.black)
                        Spacer()
                    }
                }
            }
            
            HStack {
                TextField("Mesaj gönderin..", text: $newMessage)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .frame(minHeight: CGFloat(30))
                
                Button(action: {
                    sendMessage()
                }) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.black)
                        .cornerRadius(10)
                }
            }
            .padding()
        }
        .navigationTitle(user.name)
        .navigationBarTitleDisplayMode(.inline)
    }
    
    func sendMessage() {
        guard !newMessage.isEmpty else { return }
        messages.append(Message(text: newMessage, isSentByCurrentUser: true, imageName: user.imageName))
        newMessage = ""
    }
}

struct MessageDetailView_Previews: PreviewProvider {
    static var previews: some View {
        MessageDetailView(user: ChatUser(name: "Umut Yılmaz", lastMessage: "Eminim çok iyi anlaşacaklar!", imageName: "pp1", time: "45 dk"))
    }
}
