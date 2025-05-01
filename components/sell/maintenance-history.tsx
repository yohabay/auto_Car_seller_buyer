"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Wrench, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export interface MaintenanceRecord {
  id: string
  date: Date
  type: string
  mileage: string
  description: string
  serviceProvider: string
}

interface MaintenanceHistoryProps {
  records: MaintenanceRecord[]
  onChange: (records: MaintenanceRecord[]) => void
}

export default function MaintenanceHistory({ records, onChange }: MaintenanceHistoryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<MaintenanceRecord>({
    id: "",
    date: new Date(),
    type: "",
    mileage: "",
    description: "",
    serviceProvider: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddRecord = () => {
    setCurrentRecord({
      id: Date.now().toString(),
      date: new Date(),
      type: "",
      mileage: "",
      description: "",
      serviceProvider: "",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEditRecord = (record: MaintenanceRecord) => {
    setCurrentRecord(record)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteRecord = (id: string) => {
    onChange(records.filter((record) => record.id !== id))
  }

  const handleSaveRecord = () => {
    if (isEditing) {
      onChange(records.map((record) => (record.id === currentRecord.id ? currentRecord : record)))
    } else {
      onChange([...records, currentRecord])
    }
    setIsDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentRecord((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setCurrentRecord((prev) => ({ ...prev, date }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Maintenance History</h3>
        <Button size="sm" onClick={handleAddRecord}>
          <Plus className="h-4 w-4 mr-1" /> Add Record
        </Button>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <Wrench className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <h4 className="font-medium mb-1">No maintenance records yet</h4>
          <p className="text-sm text-muted-foreground mb-4">Add service records to increase buyer confidence</p>
          <Button variant="outline" size="sm" onClick={handleAddRecord}>
            Add First Record
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[300px] border rounded-lg">
          <div className="p-4 space-y-3">
            {records.map((record) => (
              <div key={record.id} className="flex items-start justify-between p-3 border rounded-md bg-muted/30">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{record.type}</h4>
                      <span className="text-xs text-muted-foreground">{format(record.date, "MMM d, yyyy")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {record.mileage} miles • {record.serviceProvider}
                    </p>
                    <p className="text-sm mt-1">{record.description}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditRecord(record)}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => handleDeleteRecord(record.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Maintenance Record" : "Add Maintenance Record"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Service Type</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="Oil Change, Brake Service, etc."
                  value={currentRecord.type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Service Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentRecord.date && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {currentRecord.date ? format(currentRecord.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={currentRecord.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  placeholder="e.g. 25000"
                  value={currentRecord.mileage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceProvider">Service Provider</Label>
                <Input
                  id="serviceProvider"
                  name="serviceProvider"
                  placeholder="Dealer, Shop Name, Self"
                  value={currentRecord.serviceProvider}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the maintenance or repairs performed"
                rows={3}
                value={currentRecord.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRecord}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
