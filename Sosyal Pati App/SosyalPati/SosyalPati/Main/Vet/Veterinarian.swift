import Foundation
import MapKit

struct Veterinarian: Identifiable {
    let id = UUID()
    let name: String
    let coordinate: CLLocationCoordinate2D
}

let sampleVets = [
    Veterinarian(name: "DoraVet Veteriner", coordinate: CLLocationCoordinate2D(latitude: 38.4559654, longitude: 27.2006201)),
]
