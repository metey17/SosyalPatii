import SwiftUI
import MapKit

struct NearestVet: View {
    @StateObject private var locationManager = LocationManager()
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 38.4559654, longitude: 27.2006201),
        span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
    )
    
    var body: some View {
        Map(coordinateRegion: $region, annotationItems: sampleVets) { vet in
            MapMarker(coordinate: vet.coordinate, tint: .red)
        }
        .onAppear {
            if let location = locationManager.location {
                region.center = location.coordinate
            }
        }
        .navigationTitle("Nearest Vets")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct NearestVet_Previews: PreviewProvider {
    static var previews: some View {
        NearestVet()
    }
}
