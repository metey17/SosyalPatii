//
//  SosyalPatiApp.swift
//  SosyalPati
//
//  Created by Umut on 27.03.2024.
//

import SwiftUI
import Firebase

@main
struct SosyalPatiApp: App {
    init(){
        FirebaseApp.configure()
    }
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
