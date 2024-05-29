import Foundation
import MapKit

struct ChatUser: Identifiable {
    let id = UUID()
    let name: String
    let lastMessage: String
    let imageName: String
    let time: String
}

struct Message: Identifiable {
    let id = UUID()
    let text: String
    let isSentByCurrentUser: Bool
    let imageName: String
}


