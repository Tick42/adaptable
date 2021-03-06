/** based on emittery npm package, which is MIT */

export type EmitterCallback = (data?: any) => any;
export type EmitterAnyCallback = (eventName: string, data?: any) => any;

const anyMap = new WeakMap();
const eventsMap = new WeakMap();
const resolvedPromise = Promise.resolve();

//type EmitterCallback = (data?: any) => any;

function assertEventName(eventName: string) {
  if (typeof eventName !== 'string') {
    throw new TypeError('eventName must be a string');
  }
}

function assertListener(listener: EmitterCallback) {
  if (typeof listener !== 'function') {
    throw new TypeError('listener must be a function');
  }
}

function getListeners(instance: Emittery, eventName: string) {
  const events = eventsMap.get(instance);
  if (!events.has(eventName)) {
    events.set(eventName, new Set());
  }

  return events.get(eventName);
}

function defaultMethodNamesOrAssert(methodNames: string[]) {
  if (methodNames === undefined) {
    return allEmitteryMethods;
  }

  if (!Array.isArray(methodNames)) {
    throw new TypeError('`methodNames` must be an array of strings');
  }

  for (const methodName of methodNames) {
    if (!allEmitteryMethods.includes(methodName)) {
      if (typeof methodName !== 'string') {
        throw new TypeError('`methodNames` element must be a string');
      }

      throw new Error(`${methodName} is not Emittery method`);
    }
  }

  return methodNames;
}

class Emittery {
  static mixin(emitteryPropertyName: string, methodNames: string[]) {
    methodNames = defaultMethodNamesOrAssert(methodNames);
    return (target: any) => {
      if (typeof target !== 'function') {
        throw new TypeError('`target` must be function');
      }

      for (const methodName of methodNames) {
        if (target.prototype[methodName] !== undefined) {
          throw new Error(`The property \`${methodName}\` already exists on \`target\``);
        }
      }

      function getEmitteryProperty() {
        Object.defineProperty(this, emitteryPropertyName, {
          enumerable: false,
          value: new Emittery(),
        });
        return this[emitteryPropertyName];
      }

      Object.defineProperty(target.prototype, emitteryPropertyName, {
        enumerable: false,
        get: getEmitteryProperty,
      });

      const emitteryMethodCaller = (methodName: string) =>
        function(...args: any[]) {
          return this[emitteryPropertyName][methodName](...args);
        };

      for (const methodName of methodNames) {
        Object.defineProperty(target.prototype, methodName, {
          enumerable: false,
          value: emitteryMethodCaller(methodName),
        });
      }

      return target;
    };
  }

  constructor() {
    anyMap.set(this, new Set());
    eventsMap.set(this, new Map());
  }

  on(eventName: string, listener: EmitterCallback) {
    assertEventName(eventName);
    assertListener(listener);
    getListeners(this, eventName).add(listener);
    return this.off.bind(this, eventName, listener);
  }

  off(eventName: string, listener: EmitterCallback) {
    assertEventName(eventName);
    assertListener(listener);
    getListeners(this, eventName).delete(listener);
  }

  once(eventName: string) {
    return new Promise(resolve => {
      assertEventName(eventName);
      const off = this.on(eventName, data => {
        off();
        resolve(data);
      });
    });
  }

  async emit(eventName: string, eventData?: any) {
    assertEventName(eventName);

    const listeners = getListeners(this, eventName);
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];

    await resolvedPromise;
    return Promise.all([
      ...staticListeners.map(async listener => {
        if (listeners.has(listener)) {
          return listener(eventData);
        }
      }),
      ...staticAnyListeners.map(async listener => {
        if (anyListeners.has(listener)) {
          return listener(eventName, eventData);
        }
      }),
    ]);
  }

  async emitSerial(eventName: string, eventData: any) {
    assertEventName(eventName);

    const listeners = getListeners(this, eventName);
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];

    await resolvedPromise;
    /* eslint-disable no-await-in-loop */
    for (const listener of staticListeners) {
      if (listeners.has(listener)) {
        await listener(eventData);
      }
    }

    for (const listener of staticAnyListeners) {
      if (anyListeners.has(listener)) {
        await listener(eventName, eventData);
      }
    }
    /* eslint-enable no-await-in-loop */
  }

  onAny(listener: EmitterAnyCallback) {
    assertListener(listener);
    anyMap.get(this).add(listener);
    return this.offAny.bind(this, listener);
  }

  offAny(listener: EmitterCallback) {
    assertListener(listener);
    anyMap.get(this).delete(listener);
  }

  clearListeners(eventName: string) {
    if (typeof eventName === 'string') {
      getListeners(this, eventName).clear();
    } else {
      anyMap.get(this).clear();
      for (const listeners of eventsMap.get(this).values()) {
        listeners.clear();
      }
    }
  }

  listenerCount(eventName: string) {
    if (typeof eventName === 'string') {
      return anyMap.get(this).size + getListeners(this, eventName).size;
    }

    if (typeof eventName !== 'undefined') {
      assertEventName(eventName);
    }

    let count = anyMap.get(this).size;

    for (const value of eventsMap.get(this).values()) {
      count += value.size;
    }

    return count;
  }

  bindMethods(target: any, methodNames: string[]) {
    if (typeof target !== 'object' || target === null) {
      throw new TypeError('`target` must be an object');
    }

    methodNames = defaultMethodNamesOrAssert(methodNames);

    for (const methodName of methodNames) {
      if (target[methodName] !== undefined) {
        throw new Error(`The property \`${methodName}\` already exists on \`target\``);
      }

      Object.defineProperty(target, methodName, {
        enumerable: false,
        value: (this as any)[methodName].bind(this),
      });
    }
  }
}

const allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter(
  v => v !== 'constructor'
);

export default Emittery;
