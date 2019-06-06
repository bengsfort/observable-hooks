import { Subject } from 'rxjs'

type DataResolver<T> = (data: T) => T

export interface SharedSubject {
  getSubscriber(key: string): Subject<any>
  removeSubscriber(key: string): void
  getSubscription(key: string): Subject<any>
  removeSubscription(key: string): void
  createSubscription(key: string): Subject<any>
  setValue<T>(key: string, value: T): void
  setAtomicValue: <T>(key: string, path: string, dataResolver: DataResolver<T>) => void
  getAllKeys(): string[]
  getSnapshot(): { [key: string]: any }
  getValue<T>(key: string): T
}

export class SharedSubjectStore implements SharedSubject {
  private subjects: Map<string, any> = new Map()
  private store: Map<string, any> = new Map()

  public getSubscription = (key: string) => this.subjects.get(key)

  public createSubscription = (key: string) => {
    const subject = this.subjects.get(key)
    const storevalue = this.store.get(key)
    if (subject && storevalue) return subject
    this.subjects.set(key, new Subject())
    this.store.set(key, undefined)
    return this.subjects.get(key)
  }

  public getSubscriber = (key: string) => {
    return this.subjects.get(key)
  }

  public removeSubscriber = (key: string) => {
    this.subjects.delete(key)
  }

  public setValue = <T>(key: string, value: T) => {
    this.store.set(key, value)
    this.subjects.get(key).next(value)
  }

  public setAtomicValue = <T>(key: string, path: string, dataResolver: DataResolver<T>) => {
    const collection = this.store.get(key)
    this.store.set(key, dataResolver(collection))
    this.subjects.get(key).next(dataResolver(collection))
  }

  public getSnapshot = () => this.store
  public getAllKeys = () => [...this.subjects.keys()]
  public getValue = <T>(key: string): T => {
    return this.store.get(key)
  }

  public removeSubscription = (key: string) => {
    const selectedSub = this.subjects.get(key)
    if (!selectedSub) return
    selectedSub.complete()
    this.subjects.delete(key)
  }
}
