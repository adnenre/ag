"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function About() {
  const teamMembers = [
    {
      name: "Mariem Bouajina",
      role: "Co-Founder",
      //bio: "Former agricultural economist with 10 years in market analysis",
      avatar: "/teams/mariem.webp",
    },
    {
      name: "Fares Ajround",
      role: "Co-Founder",
      // bio: "Full-stack developer specializing in rural tech solutions",
      avatar: "/teams/fares.webp",
    },
    {
      name: "Adnen Rebai",
      role: "Co-Founder",
      //bio: "Supply chain expert with focus on perishable goods",
      avatar: "/teams/adnen.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col md:flex-row relative"
        style={{
          backgroundImage: "url('/vegetables/vegitable1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay to make text more readable (optional) */}

        {/* Spacer column (left side) - empty but maintains layout */}
        <div className="hidden md:block md:w-1/3"></div>

        {/* Content column (right side) */}
        <div className="w-full md:w-2/3 flex  items-center justify-center p-4 relative z-10">
          <div className=" text-center md:text-right bg-white bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 text-center">
              We bring agriculture to excellence
            </h1>
            <p className="text-xl text-gray-600 mb-10 text-center">
              Farmers often lack timely and accurate information about demand
              trends in wholesale markets, leading to production mismatches and
              lost sales opportunities.
            </p>
          </div>
        </div>
      </section>
      {/* introducing */}
      <section className="min-h-screen flex items-center justify-center py-20    mx-auto text-center bg-green-800">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Introducing AgriConnect
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            AgriConnect bridges the gap between farmers and regional market
            agents, making it easier to exchange requests and manage inventory.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
            <Button className="bg-green-600 hover:bg-green-700">
              <Link href="/register/farmer"> Join as Farmer</Link>
            </Button>
            <Button
              variant="outline"
              className="text-green-600 border-green-600"
            >
              <Link href="/register/agent"> Join as Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Values Section - Add this before the Team Section */}
      <section className="min-h-screen py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-800">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1: Community */}
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <CardTitle>Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe agriculture thrives on human connections. Our
                  platform strengthens bonds between farmers, buyers, and
                  communities, creating networks that endure beyond
                  transactions.
                </p>
              </CardContent>
            </Card>

            {/* Value 2: Integrity */}
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <CardTitle>Rooted in Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Honest dealings form the bedrock of farming. We champion
                  transparency in pricing, truthful representation of produce,
                  and fair treatment for all partners in the agricultural chain.
                </p>
              </CardContent>
            </Card>

            {/* Value 3: Resilience */}
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle>Resilience Through Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Farming demands adaptability. We equip agricultural
                  communities with real-time market intelligence and peer wisdom
                  to weather uncertainties and make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Objectives Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-none  hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Supply Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                Reduce production mismatches through real-time demand signals
              </CardContent>
            </Card>

            <Card className="bg-white border-none hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                Minimize waste by connecting harvests to immediate buyers
              </CardContent>
            </Card>

            <Card className="bg-white border-none hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Adaptive Growth</CardTitle>
              </CardHeader>
              <CardContent>
                Phased regional rollout with continuous feedback integration
              </CardContent>
            </Card>
          </div>

          <p className="mt-12 text-center text-green-100 max-w-4xl mx-auto">
            "By optimizing supply coordination and reducing mismatches, the
            platform minimizes waste and supports sustainable agricultural
            practices. Designed for phased growth."
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen flex justify-center items-center  max-w-6xl mx-auto px-4">
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-800">
            Our Team
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader className="items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-green-800">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent className="text-center">
                <p>{member.bio}</p>
              </CardContent> */}
              </Card>
            ))}
          </div>
          <p className="bold text-xl mt-12 text-center text-green-800 max-w-4xl mx-auto">
            "AgriConnect adapts to different regional markets and integrates new
            features based on user feedback and evolving industry needs. "
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="min-h-screen bg-green-50 flex justify-center items-center relative"
        style={{
          backgroundImage: "url('/vegetables/vegitable2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 bg-white bg-opacity-50 p-8 rounded-lg z-10">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Ready to transform agricultural markets?
          </h2>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg">
            <Link href="/register">Get Early Access</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
