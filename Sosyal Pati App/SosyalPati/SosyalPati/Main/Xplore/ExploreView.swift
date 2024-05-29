
import SwiftUI

struct ExploreView: View {
    @State private var showSearchView = false
    var body: some View {
        NavigationStack{
            
            if showSearchView{
                SearchView(show: $showSearchView)
            }else{
                ScrollView{
                    FilterCityBar()
                        .onTapGesture{
                            withAnimation(.snappy){
                                showSearchView.toggle()
                            }
                        }
                    
                    LazyVStack(spacing: 32){
                        ForEach(1 ... 10 ,id: \.self){
                            listing in NavigationLink(value: listing) {
                                ListingItemView()
                                    .frame(height: 400)
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                            }
                        }
                    }
                    
                }
            }
            
            
            
        }
    }
}

#Preview {
    ExploreView()
}
