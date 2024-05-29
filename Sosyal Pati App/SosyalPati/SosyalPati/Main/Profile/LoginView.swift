
import SwiftUI
import PhotosUI
import Firebase
import FirebaseFirestore
import FirebaseStorage

struct LoginView: View {
    @State private var homeScreenView = ExploreView()
    
    @State var emailID: String = ""
    @State var password: String = ""
    
    //Özellikleri Görüntüleme
    @State var createAccount: Bool = false
    @State var showError: Bool = false
    @State var errorMessage: String = ""
    
    var body: some View {
        
        
        VStack(spacing: 12){

            Image("SosyalPatiLogo")
                .resizable()
                .frame(width: 150,height: 150)
                .scaledToFit()
            
            Text("Giriş Yap")
                .font(.largeTitle.bold())
                .hAlign(.leading)
                
            
            
            Text("Tekrar Hoşgeldin")
                .font(.title3)
                .hAlign(.leading)
            
            VStack(spacing: 12){
                TextField("Email", text: $emailID)
                    .textContentType(.emailAddress)
                    .border(1, .gray.opacity(0.5))
                    .padding(.top,25)
                
                
                
                SecureField("Şifre", text: $password)
                    .textContentType(.emailAddress)
                    .border(1, .gray.opacity(0.5))
                
                Button("Şifremi unuttum",action: resetPassword)
                    .font(.callout)
                    .fontWeight(.medium)
                    .tint(.black)
                    .hAlign(.trailing)
                
                Button(action: loginUser) {
                    //Giriş Butonu
                    Text("Giriş yap")
                        .foregroundStyle(.white)
                        .foregroundStyle(.white)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .frame(width: 360, height: 48)
                        .background(.black)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                }
                .padding(.top,10)
                
                
                

                
                
                
                
            }
            
            
            
            
            //Kayıt Butonu
            HStack{
                Text("Hesabın yok mu?")
                    .foregroundStyle(.gray)
                
                Button("Kayıt ol"){
                    createAccount.toggle()
                }
                .fontWeight(.bold)
                .foregroundColor(.black)
            }
            .font(.callout)
            .vAlign(.bottom)
        
        }
        .vAlign(.top)
        .padding(15)
        //kayıt atama
        .fullScreenCover(isPresented: $createAccount) {
            RegisterView()
        }
        //Uyarı Gösterme
        .alert(errorMessage, isPresented: $showError, actions: {})
    }
    
    func loginUser(){
        Task{
            do{
                //kimlik doğrulama kısa yoldan
                try await Auth.auth().signIn(withEmail: emailID, password: password)
                print("Kullanıcı Bulundu")
            }catch{
                await setError(error)
            }
        }
    }
    
    func resetPassword(){
        Task{
            do{
                //kimlik doğrulama kısa yoldan
                try await Auth.auth().sendPasswordReset(withEmail: emailID)
                print("Link Gönderildi")
            }catch{
                await setError(error)
            }
        }
    }
    
    //Hata mesajı bastır
    func setError(_ error: Error) async{
        //ui mainthreadde güncelleme
        await MainActor.run(body: {
            errorMessage = error.localizedDescription
            showError.toggle()
        })
    }
    
}

//Kayıt işlemleri
struct RegisterView: View{
    //Kullanıcı detayları
    @State var emailID: String = ""
    @State var password: String = ""
    @State var userName: String = ""
    @State var userBio: String = ""
    @State var userBioLink: String = ""
    @State var userProfilePicData: Data?
    
    //Özellikleri görüntüle
    @Environment(\.dismiss) var dismiss
    @State var showImagePicker: Bool = false
    @State var photoItem: PhotosPickerItem?
    @State var showError: Bool = false
    @State var errorMessage: String = ""
    
    var body: some View{
        VStack(spacing: 12){

            Image("SosyalPatiLogo")
                .resizable()
                .frame(width: 150,height: 150)
                .scaledToFit()
            
            Text("Hesap Oluştur")
                .font(.largeTitle.bold())
                .hAlign(.leading)
                
            
            
            Text("Yeni bir patili arkadaşla tanışmaya hazır mısın?. Şimdi kayıt ol!")
                .font(.title3)
                .hAlign(.leading)
            
            
            //Diğer iphone ekranlarıyla genel optimizasyon
            ViewThatFits{
                ScrollView(.vertical, showsIndicators: false){
                    helperView()
                }
                helperView()
            }
            
            //Kayıt Butonu
            HStack{
                Text("Hesabın var mı?")
                    .foregroundStyle(.gray)
                
                Button("Giriş yap"){
                    dismiss()
                }
                .fontWeight(.bold)
                .foregroundColor(.black)
            }
            .font(.callout)
            .vAlign(.bottom)
            
            
            
        }
        .vAlign(.top)
        .padding(15)
        .photosPicker(isPresented: $showImagePicker, selection: $photoItem)
        //IOS 17 DESTEKLİ DEĞİL MOBİL TEST İÇİN YORUMA AL
        .onChange( of: photoItem){ newValue in
            //EUI Görüntüsünü photoItem den çıkarma
            if let newValue {
                Task{
                    do{
                        guard let imageData = try await newValue.loadTransferable(type: Data.self) else{
                            return
                        }// arayüzü main threadde güncelle
                        await MainActor.run(body:{ userProfilePicData = imageData})
                        
                    }catch{}
                }
            }
            
        }// buraya kadar detekli değil
            //displaying alert
        .alert(errorMessage, isPresented: $showError, actions: {})
    }

    @ViewBuilder
    func helperView()-> some View{
        VStack(spacing: 12){
            ZStack{
                if let userProfilePicData, let image = UIImage(data: userProfilePicData){
                    Image(uiImage: image)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                }else{
                    Image("nullCatProfile")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                }
            }
            .frame(width: 85, height: 85)
            .clipShape(Circle())
            .contentShape(Circle())
            .onTapGesture {
                showImagePicker.toggle()
            }
            .padding(.top,25)
            
            
            TextField("Kullanıcı adı", text: $userName)
                .textContentType(.emailAddress)
                .border(1, .gray.opacity(0.5))
                
            
            TextField("Email", text: $emailID)
                .textContentType(.emailAddress)
                .border(1, .gray.opacity(0.5))
               
            
            
            
            SecureField("Şifre", text: $password)
                .textContentType(.emailAddress)
                .border(1, .gray.opacity(0.5))
            
            TextField("Patili dostumuz hakkında", text: $userBio, axis: .vertical)
                .frame(minHeight: 100, alignment: .top)
                .textContentType(.emailAddress)
                .border(1, .gray.opacity(0.5))
            
            TextField("Bio Link (Opsiyonel)", text: $userBioLink)
                .textContentType(.emailAddress)
                .border(1, .gray.opacity(0.5))
            
            
            
            Button(action: registerUser) {
                //Giriş Butonu
                Text("Kayıt ol")
                    .foregroundStyle(.white)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .frame(width: 360, height: 48)
                    .background(.black)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }
            .disableWithOpacity(userName == "" || userBio == "" || emailID == "" || password == "" || userProfilePicData == nil)
            .padding(.top,10)
        
            
        }
    }
    
    func registerUser(){
        Task{
            do{//firebase hesabı yarat
                try await Auth.auth().createUser(withEmail: emailID, password: password)
                //fotoğrafları firebase e kaydet
                guard let userUID = Auth.auth().currentUser?.uid else{return}
                guard let imageData = userProfilePicData else{return}
                let storageRef = Storage.storage().reference().child("Profile_Images").child(userUID)
                let _ = try await storageRef.putDataAsync(imageData)
                //downloading photo url
                let downloadURL = try await storageRef.downloadURL()
                //creating a user firestore object
                let user = User(username: userName, userBio: userBio, userBioLink: userBioLink, userUID: userUID, userEmail: emailID, userProfileURL: downloadURL)
                //saving user doc into firestore database
                let _ = try Firestore.firestore().collection("Users").document(userUID).setData(from: user, completion: {error in if error == nil{
                    //print saved successfully
                    print("Başarıyla Kaydedildi")
                }}  )
                
            }catch{// hesap silme
                try await Auth.auth().currentUser?.delete()
                
            }
        }
        
    }
    
    func setError(_ error: Error)async{
        await MainActor.run(body: {
            errorMessage = error.localizedDescription
            showError.toggle()
        })
    }
    
}


#Preview {
    LoginView()
}

//Kullanıcı arayüz için uzantılar
extension View{
    func disableWithOpacity(_ condition: Bool)->some View{
        self
            .disabled(condition)
            .opacity(condition ? 0.6 : 1)
    }
    
    func hAlign(_ alignment: Alignment)-> some View{
        self
            .frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/, alignment: alignment)
    }
    
    func vAlign(_ alignment: Alignment)-> some View{
        self
            .frame(maxHeight: .infinity, alignment: alignment)
    }
    
    
    //Özel kalın görünüş
    func border(_ width: CGFloat,_ color: Color)-> some View{
        self.padding(.horizontal, 15)
            .padding(.vertical, 10)
            .background{
                RoundedRectangle(cornerRadius: 5, style: .continuous)
                    .stroke(color, lineWidth: width)
            }
    }
    
    //Custom Fill 
    func fillView(_ color: Color)-> some View{
        self.padding(.horizontal, 15)
            .padding(.vertical, 10)
            .background{
                RoundedRectangle(cornerRadius: 5, style: .continuous)
                    .fill(color)
            }
    }
    
    
}
