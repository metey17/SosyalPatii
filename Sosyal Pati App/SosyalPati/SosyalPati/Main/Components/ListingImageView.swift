
import SwiftUI

struct ListingImageView: View {
    var images = ["kedi1", "kedi2", "kedi3"]
    var body: some View {
        TabView{
            ForEach(images, id: \.self){ image in Image(image)
                    .resizable()
            }
        }
        .tabViewStyle(.page)
    }
}

#Preview {
    ListingImageView()
}
