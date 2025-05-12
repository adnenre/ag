"use client"

import { Input } from "@/components/ui/input"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Basic Plan</CardTitle>
            <CardDescription>For small-scale farmers and market agents</CardDescription>
            <div className="mt-4 text-4xl font-bold">
              $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Up to 10 inventory items</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>View market requests</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pro Plan</CardTitle>
              <span className="bg-green-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">Popular</span>
            </div>
            <CardDescription>For medium-sized operations</CardDescription>
            <div className="mt-4 text-4xl font-bold">
              $24.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Unlimited inventory items</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Create and respond to requests</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Advanced analytics and reporting</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Priority matching</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise Plan</CardTitle>
            <CardDescription>For large-scale operations</CardDescription>
            <div className="mt-4 text-4xl font-bold">
              $49.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Everything in Pro Plan</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>API access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Market trend predictions</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Choose your billing cycle and enter payment details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Billing Cycle</Label>
            <RadioGroup defaultValue="monthly" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">
                  Monthly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer">
                  Yearly (Save 15%)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="card-name">Name on Card</Label>
              <Input id="card-name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700">Update Billing Information</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
