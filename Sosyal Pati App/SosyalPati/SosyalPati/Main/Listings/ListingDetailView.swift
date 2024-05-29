
import SwiftUI

struct ListingDetailView: View {
    var images = ["kedi1", "kedi2", "kedi3"]
    var body: some View {
        ScrollView{
            ListingImageView()
                .frame(height: 320)
            
            VStack(alignment: .leading, spacing: 8){
                Text("Venüs")
                    .font(.title)
                    .fontWeight(.semibold)
                Text("İzmir - Bornova")
                    .font(.caption)
            }
            .padding(.leading)
            .frame(maxWidth: .infinity, alignment: .leading)
            
            Divider()
            
            
            
        }
    }
}

#Preview {
    ListingDetailView()
}
