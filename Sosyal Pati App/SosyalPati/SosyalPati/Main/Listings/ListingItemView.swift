

import SwiftUI

struct ListingItemView: View {
    
    var images = ["kedi1", "kedi2", "kedi3"]
    var body: some View {
        VStack(){
            //resimler
            
            ListingImageView()
                .frame(height: 320)
                .clipShape(RoundedRectangle(cornerRadius: 10))
                
            HStack(spacing:2){
                Image(systemName: "heart.fill")
            }
            .hAlign(.trailing)
            .font(.footnote)
            
            //listing detay
            HStack(spacing: 8){
                //detaylar
                VStack(alignment: .leading){
                    Text("Venüs")
                        .fontWeight(.semibold)
                        .foregroundStyle(.black)
                    Text("Erkek")
                        .foregroundStyle(.blue)
                    Text("Yaş: 5")
                        .fontWeight(.light)
                        .foregroundStyle(.black)
                    
                    
                    
                    HStack{
                        Text("İzmir")
                            .fontWeight(.semibold)
                            
                    
                        Text("Bornova")
                        
                    }
                    .foregroundStyle(.black)
                    
                    
                    
                    
                    
                   
                    
                }
                .font(.footnote)
                .hAlign(.leading)
                
                
            }
            
            
            
            
            
        }
        .padding()
        
        
        
    }
}

#Preview {
    ListingItemView()
}
