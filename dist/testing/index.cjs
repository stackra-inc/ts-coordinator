'use strict';

require('react');

/**
 * @stackra/ts-coordinator v0.1.0
 * (c) 2026 [object Object]
 * @license MIT
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? /* @__PURE__ */ Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata2(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata2);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata2);
        function getMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata2);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        function Type(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x) {
          return x === void 0;
        }
        function IsNull(x) {
          return x === null;
        }
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = "string" ;
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input);
        }
        function OrdinaryToPrimitive(O, hint) {
          var valueOf, result; {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument);
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata3 = reflect.defineMetadata, hasOwnMetadata3 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                return true;
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata3,
            OrdinaryHasOwnMetadata: hasOwnMetadata3,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            (function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            })()
          );
          var Map2 = (
            /** @class */
            (function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            })()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          function getValue(_, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            (function() {
              function Set3() {
                this._map = new _Map();
              }
              Object.defineProperty(Set3.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            })()
          );
          return Set2;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            (function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            })()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// node_modules/.pnpm/@vivtel+metadata@1.0.5_reflect-metadata@0.2.2/node_modules/@vivtel/metadata/dist/index.mjs
__toESM(require_Reflect());
function getMetadata(metadataKey, target, propertyKey) {
  {
    return Reflect.getMetadata(metadataKey, target);
  }
}
function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
  {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }
}
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
var DISCOVERABLE_DECORATOR_KEY_PREFIX = "@discoverable:";
var MODULE_METADATA = {
  IMPORTS: "imports",
  PROVIDERS: "providers",
  CONTROLLERS: "controllers",
  EXPORTS: "exports"
};
var GLOBAL_MODULE_METADATA = "__module:global__";
var SCOPE_OPTIONS_METADATA = "scope:options";
var INJECTABLE_WATERMARK = "__injectable__";
function Injectable(options) {
  return (target) => {
    defineMetadata(INJECTABLE_WATERMARK, true, target);
    defineMetadata(SCOPE_OPTIONS_METADATA, options, target);
  };
}
var DiscoverableMetaHostCollection = class {
  static {
    this.metaHostLinks = /* @__PURE__ */ new Map();
  }
  static {
    this.providersByMetaKey = /* @__PURE__ */ new WeakMap();
  }
  /**
   * Register a class → metadata-key link.
   *
   * Called from inside the decorator returned by
   * `DiscoveryService.createDecorator()` whenever the decorator is applied
   * at class level.
   *
   * @param target - The decorated class (or constructor function)
   * @param metadataKey - The key produced by `DiscoveryService.createDecorator()`
   */
  static addClassMetaHostLink(target, metadataKey) {
    this.metaHostLinks.set(target, metadataKey);
  }
  /**
   * Remove every class → metadata-key link.
   *
   * Primarily useful for tests that register fresh classes for each
   * suite. Production code should never need to call this.
   */
  static clearClassMetaHostLinks() {
    this.metaHostLinks.clear();
  }
  /**
   * Inspect a provider wrapper and add it to the per-container index if
   * its class was registered via {@link addClassMetaHostLink}.
   *
   * Called once per provider during `ModuleContainer.addProvider()`.
   * No-op when the provider's class was never decorated with a
   * discoverable decorator — the common case.
   *
   * @param hostContainerRef - The `ModuleContainer` the provider belongs to
   * @param instanceWrapper - The provider wrapper produced by `Module.addProvider`
   */
  static inspectProvider(hostContainerRef, instanceWrapper) {
    const metaKey = this.getMetaKeyByInstanceWrapper(instanceWrapper);
    if (!metaKey) {
      return;
    }
    let collection = this.providersByMetaKey.get(hostContainerRef);
    if (!collection) {
      collection = /* @__PURE__ */ new Map();
      this.providersByMetaKey.set(hostContainerRef, collection);
    }
    this.insertByMetaKey(metaKey, instanceWrapper, collection);
  }
  /**
   * Insert a wrapper into the per-key set, creating the set on demand.
   *
   * Re-inserting the same wrapper is a no-op (Sets dedupe by reference),
   * which makes `inspectProvider` safe to call multiple times — useful in
   * scenarios where the same provider is registered into more than one
   * module via dynamic-module merging.
   *
   * @param metaKey - The discoverable key
   * @param instanceWrapper - The provider wrapper to add
   * @param collection - The per-container key-to-wrappers map
   */
  static insertByMetaKey(metaKey, instanceWrapper, collection) {
    const wrappers = collection.get(metaKey);
    if (wrappers) {
      wrappers.add(instanceWrapper);
      return;
    }
    collection.set(metaKey, /* @__PURE__ */ new Set([instanceWrapper]));
  }
  /**
   * Look up every provider tagged with the given metadata key for a
   * specific `ModuleContainer`.
   *
   * Returns an empty `Set` when nothing has been registered. Callers
   * typically wrap the result with `Array.from(...)` to expose it as an
   * array.
   *
   * @param hostContainerRef - The `ModuleContainer` to query
   * @param metaKey - The discoverable key to look up
   * @returns A `Set` of `InstanceWrapper`s — possibly empty
   */
  static getProvidersByMetaKey(hostContainerRef, metaKey) {
    const collection = this.providersByMetaKey.get(hostContainerRef);
    return collection?.get(metaKey) ?? /* @__PURE__ */ new Set();
  }
  /**
   * Resolve a wrapper's class reference, falling back through the
   * possible shapes a provider can take.
   *
   * - Class providers — `wrapper.metatype` is the class itself.
   * - Value providers — `wrapper.metatype` is `null`; we fall back to
   *   `wrapper.instance?.constructor` because the value is set at
   *   registration time.
   * - Factory providers — `wrapper.metatype` is the factory function and
   *   `wrapper.inject` is non-null. Falling back to
   *   `wrapper.instance?.constructor` would still point at the produced
   *   instance's class once it has been resolved, but at scan-time the
   *   instance is `null`. Factory-produced classes therefore are not
   *   indexed, which matches NestJS's behavior — there's no decorated
   *   class to associate the wrapper with.
   *
   * @param instanceWrapper - The wrapper to inspect
   * @returns The discoverable key, or `undefined` if the class isn't tagged
   */
  static getMetaKeyByInstanceWrapper(instanceWrapper) {
    let classRef;
    if (instanceWrapper.metatype && !instanceWrapper.inject) {
      classRef = instanceWrapper.metatype;
    } else {
      classRef = instanceWrapper.instance?.constructor ?? instanceWrapper.metatype;
    }
    if (!classRef) {
      return void 0;
    }
    return this.metaHostLinks.get(classRef);
  }
};
var resolvedInstances = /* @__PURE__ */ new Map();
function getTokenKey(token) {
  if (typeof token === "function") return token.name;
  if (typeof token === "symbol") return token.toString();
  return String(token);
}
function inject(token) {
  return new Proxy({}, {
    get(_target, prop) {
      {
        if (prop === Symbol.toPrimitive) return () => `[inject:${String(token)}]`;
        if (prop === Symbol.toStringTag) return `inject<${String(token)}>`;
        if (prop === Symbol.iterator) return void 0;
        if (prop === "toString") return () => `[inject:${String(token)}]`;
        if (prop === "valueOf") return () => null;
        if (prop === "toJSON") return () => null;
        if (prop === "$$typeof") return void 0;
        if (prop === "constructor") return void 0;
        if (prop === "prototype") return void 0;
        if (prop === "render") return void 0;
        if (prop === "displayName") return void 0;
        if (prop === "name") return `inject<${String(token)}>`;
        if (prop === "length") return 0;
        if (prop === "caller") return void 0;
        if (prop === "arguments") return void 0;
        if (prop === "apply") return void 0;
        if (prop === "call") return void 0;
        if (prop === "bind") return void 0;
        if (typeof prop === "string" && prop.startsWith("@@__IMMUTABLE")) return void 0;
        if (prop === "inspect" || prop === "nodeType") return void 0;
        throw new Error(
          `inject(${String(token)}) cannot resolve \u2014 application not bootstrapped yet. Ensure ApplicationFactory.create() has been called before accessing this service.`
        );
      }
    }
  });
}
inject.swap = function swap(token, instance) {
  const key = getTokenKey(token);
  resolvedInstances.set(key, instance);
};
inject.clear = function clear(token) {
  const key = getTokenKey(token);
  resolvedInstances.delete(key);
};
inject.clearAll = function clearAll() {
  resolvedInstances.clear();
};
function generateMetadataKey() {
  const cryptoRef = globalThis.crypto;
  const uuid = cryptoRef?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;
  return `${DISCOVERABLE_DECORATOR_KEY_PREFIX}${uuid}`;
}
var DiscoveryService = class {
  /**
   * Create a new `DiscoveryService` instance.
   *
   * The container is normally injected automatically — `ApplicationFactory.create()`
   * registers `ModuleContainer` as a value provider on every module so any
   * module that imports `DiscoveryModule` can resolve it.
   *
   * @param modulesContainer - The active `ModuleContainer`
   */
  constructor(modulesContainer) {
    this.modulesContainer = modulesContainer;
  }
  /**
   * Create a discoverable class/method decorator.
   *
   * Each call generates a unique metadata key. The returned decorator:
   *
   * - At class level: writes the options under `KEY` on the class **and**
   *   registers the class with {@link DiscoverableMetaHostCollection} so
   *   it can be looked up by `getProviders({ metadataKey })`.
   *
   * - At method level: writes the options under `KEY` on the method's
   *   property descriptor value (the function). Methods are not registered
   *   with the static index — use `getMetadataByDecorator(decorator, wrapper, methodKey)`
   *   to read method-level metadata back.
   *
   * `opts` defaults to an empty object when omitted, mirroring NestJS's
   * behavior — `Reflect.getMetadata(KEY, target)` then returns `{}` rather
   * than `undefined`, which simplifies consumer code.
   *
   * @typeParam T - Shape of the options object
   * @returns A class/method decorator with a stable `KEY` property
   *
   * @example
   * ```typescript
   * const Webhook = DiscoveryService.createDecorator<{ name: string }>();
   *
   * @Webhook({ name: 'flush' })
   * class FlushWebhook {}
   *
   * Webhook.KEY; // → '@discoverable:7f1c8b40-…'
   * ```
   */
  static createDecorator() {
    const metadataKey = generateMetadataKey();
    const decorator = ((opts) => {
      const value = opts ?? {};
      return ((target, propertyKey, descriptor) => {
        if (descriptor && propertyKey !== void 0) {
          defineMetadata(metadataKey, value, descriptor.value);
          return descriptor;
        }
        DiscoverableMetaHostCollection.addClassMetaHostLink(target, metadataKey);
        defineMetadata(metadataKey, value, target);
        return target;
      });
    });
    Object.defineProperty(decorator, "KEY", {
      value: metadataKey,
      writable: false,
      configurable: false,
      enumerable: true
    });
    return decorator;
  }
  /**
   * Find provider wrappers in the running container.
   *
   * Three modes:
   *
   * - `getProviders()` — every provider in every module, flattened.
   * - `getProviders({ include: [SomeModule, ...] })` — providers from a
   *   whitelist of module classes only.
   * - `getProviders({ metadataKey: SomeDecorator.KEY })` — providers whose
   *   class was decorated with `SomeDecorator`. Resolved in O(1) via the
   *   static `DiscoverableMetaHostCollection` index.
   *
   * The `metadataKey` and `include` options are mutually exclusive — when
   * `metadataKey` is present it takes precedence and `modules` is ignored,
   * matching NestJS.
   *
   * @param options - Discovery filter
   * @param modules - Optional pre-computed module list (used internally)
   * @returns Array of `InstanceWrapper`s — possibly empty
   */
  getProviders(options = {}, modules = this.getModules(options)) {
    if ("metadataKey" in options && options.metadataKey) {
      const wrappers = DiscoverableMetaHostCollection.getProvidersByMetaKey(
        this.modulesContainer,
        options.metadataKey
      );
      return Array.from(wrappers);
    }
    const result = [];
    for (const moduleRef of modules) {
      for (const wrapper of moduleRef.providers.values()) {
        result.push(wrapper);
      }
    }
    return result;
  }
  /**
   * Read the metadata that was attached to a wrapper by a discoverable
   * decorator.
   *
   * Without `methodKey`, reads class-level metadata from
   * `wrapper.instance.constructor` (so `useValue` / `useFactory` providers
   * resolve to the actual class) or `wrapper.metatype` as a fallback.
   *
   * With `methodKey`, reads method-level metadata from
   * `wrapper.instance[methodKey]`. The wrapper must be resolved at this
   * point (which is always the case after `ApplicationFactory.create()` returns).
   *
   * @typeParam D - The decorator type, used to infer the options shape
   * @param decorator - The decorator factory whose `KEY` to look up
   * @param wrapper - A wrapper returned by `getProviders()`
   * @param methodKey - Optional method name for method-level metadata
   * @returns The options object, or `undefined` if the wrapper isn't tagged
   */
  getMetadataByDecorator(decorator, wrapper, methodKey) {
    if (methodKey) {
      const instance = wrapper.instance;
      const method = instance?.[methodKey];
      if (typeof method !== "function") {
        return void 0;
      }
      return getMetadata(decorator.KEY, method);
    }
    const classRef = wrapper.instance?.constructor ?? wrapper.metatype;
    if (!classRef) {
      return void 0;
    }
    return getMetadata(decorator.KEY, classRef);
  }
  /**
   * Resolve the module list to walk for `getProviders()` without a
   * `metadataKey` filter.
   *
   * @param options - The original discovery options
   * @returns Modules in the container, or a whitelisted subset
   */
  getModules(options = {}) {
    if (!("include" in options) || !options.include) {
      return [...this.modulesContainer.getModules().values()];
    }
    const whitelist = options.include;
    const matches = [];
    for (const moduleRef of this.modulesContainer.getModules().values()) {
      if (whitelist.some((cls) => cls === moduleRef.metatype)) {
        matches.push(moduleRef);
      }
    }
    return matches;
  }
};
DiscoveryService = __decorateClass([
  Injectable()
], DiscoveryService);

// node_modules/.pnpm/@stackra+ts-container@https+++codeload.github.com+stackra-inc+ts-container+tar.gz+f928d_f2e3b1897e242403a4c440ca1c44bd7c/node_modules/@stackra/ts-container/dist/index.js
__toESM(require_Reflect());
var PROPERTY_TO_METADATA_KEY = {
  imports: MODULE_METADATA.IMPORTS,
  controllers: MODULE_METADATA.CONTROLLERS,
  providers: MODULE_METADATA.PROVIDERS,
  exports: MODULE_METADATA.EXPORTS
};
var VALID_MODULE_KEYS = new Set(Object.keys(PROPERTY_TO_METADATA_KEY));
function Module(metadata) {
  const invalidKeys = Object.keys(metadata).filter((key) => !VALID_MODULE_KEYS.has(key));
  if (invalidKeys.length > 0) {
    throw new Error(
      `Invalid property '${invalidKeys.join("', '")}' passed into the @Module() decorator. Valid properties are: ${[...VALID_MODULE_KEYS].join(", ")}.`
    );
  }
  return (target) => {
    for (const property in metadata) {
      if (!Object.prototype.hasOwnProperty.call(metadata, property)) continue;
      const metadataKey = PROPERTY_TO_METADATA_KEY[property];
      defineMetadata(metadataKey, metadata[property], target);
    }
  };
}
function Global() {
  return (target) => {
    defineMetadata(GLOBAL_MODULE_METADATA, true, target);
  };
}
var Reflector = class {
  /**
   * Read metadata from a single target (class or method).
   *
   * @typeParam T - The expected metadata type
   * @param metadataKey - The metadata key to read
   * @param target - The class constructor or method function
   * @returns The metadata value, or `undefined` if not set
   *
   * @example
   * ```typescript
   * const roles = reflector.get<string[]>('roles', handler);
   * ```
   */
  get(metadataKey, target) {
    return getMetadata(metadataKey, target);
  }
  /**
   * Read metadata from multiple targets and return the first non-undefined value.
   *
   * Useful for the "method overrides class" pattern — check the method
   * first, fall back to the class. The first target that has the metadata
   * wins.
   *
   * @typeParam T - The expected metadata type
   * @param metadataKey - The metadata key to read
   * @param targets - Array of targets to check in order (first match wins)
   * @returns The first non-undefined metadata value, or `undefined`
   *
   * @example
   * ```typescript
   * // Method-level @Roles(['admin']) overrides class-level @Roles(['user'])
   * const roles = reflector.getAllAndOverride<string[]>('roles', [
   *   handler,       // method — checked first
   *   controller,    // class — fallback
   * ]);
   * ```
   */
  getAllAndOverride(metadataKey, targets) {
    for (const target of targets) {
      const result = getMetadata(metadataKey, target);
      if (result !== void 0) {
        return result;
      }
    }
    return void 0;
  }
  /**
   * Read metadata from multiple targets and merge all values into a flat array.
   *
   * Useful for the "accumulate from all levels" pattern — collect roles
   * from both the method and the class, then check if the user has any.
   *
   * @typeParam T - The expected metadata item type
   * @param metadataKey - The metadata key to read
   * @param targets - Array of targets to read from
   * @returns A flat array of all metadata values found (empty if none)
   *
   * @example
   * ```typescript
   * // Class has @Roles(['user']), method has @Roles(['admin'])
   * const allRoles = reflector.getAllAndMerge<string>('roles', [
   *   handler,
   *   controller,
   * ]);
   * // → ['admin', 'user']
   * ```
   */
  getAllAndMerge(metadataKey, targets) {
    const result = [];
    for (const target of targets) {
      const value = getMetadata(metadataKey, target);
      if (value === void 0) continue;
      if (Array.isArray(value)) {
        result.push(...value);
      } else {
        result.push(value);
      }
    }
    return result;
  }
};
Reflector = __decorateClass([
  Injectable()
], Reflector);
var DiscoveryModule = class {
};
DiscoveryModule = __decorateClass([
  Global(),
  Module({
    providers: [DiscoveryService],
    exports: [DiscoveryService]
  })
], DiscoveryModule);

// node_modules/.pnpm/@stackra+contracts@https+++codeload.github.com+stackra-inc+contracts+tar.gz+195bfa165411057dee5107275b1605469c39781e/node_modules/@stackra/contracts/dist/index.js
var TAB_COORDINATOR = /* @__PURE__ */ Symbol.for("TAB_COORDINATOR");
var TAB_LOCK_MANAGER = /* @__PURE__ */ Symbol.for("TAB_LOCK_MANAGER");

// src/testing/expose-test-globals.util.ts
function exposeCoordinatorTestGlobals() {
  if (typeof window === "undefined") return;
  const coordinator = inject(TAB_COORDINATOR);
  const lockManager = inject(TAB_LOCK_MANAGER);
  const win = window;
  win.__coordinatorRole = coordinator.getRole();
  coordinator.role$.subscribe((role) => {
    win.__coordinatorRole = role;
  });
  win.__coordinatorTabCount = coordinator.getTabCount();
  coordinator.tabCount$.subscribe((count) => {
    win.__coordinatorTabCount = count;
  });
  win.__coordinatorReceivedEvents = win.__coordinatorReceivedEvents ?? [];
  win.__emitTestEvent = (eventName, payload) => {
    try {
      const emitter = inject(/* @__PURE__ */ Symbol.for("EVENT_EMITTER"));
      if (emitter && typeof emitter.emit === "function") {
        emitter.emit(
          eventName,
          payload
        );
      }
    } catch {
    }
  };
  win.__acquireLock = async (name, holdMs) => {
    const startTime = Date.now();
    let endTime = startTime;
    let usedWebLocks = false;
    try {
      await lockManager.run(name, async () => {
        usedWebLocks = typeof navigator !== "undefined" && "locks" in navigator;
        await new Promise((resolve) => setTimeout(resolve, holdMs));
        endTime = Date.now();
      });
      return { acquired: true, startTime, endTime, usedWebLocks };
    } catch {
      return { acquired: false, startTime, endTime: Date.now(), usedWebLocks };
    }
  };
  win.__triggerSync = () => {
    if (coordinator.isLeader()) {
      return { synced: true, role: "leader" };
    }
    return { synced: false, role: "follower" };
  };
  win.__hasWebSocket = () => {
    try {
      const realtimeManager = inject(/* @__PURE__ */ Symbol.for("REALTIME_MANAGER"));
      return realtimeManager?.isConnectionActive?.() ?? false;
    } catch {
      return false;
    }
  };
}
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

@vivtel/metadata/dist/index.mjs:
  (**
   * @vivtel/metadata v1.0.5
   * (c) 2025 Akouta
   * @license MIT
   *)
*/

exports.exposeCoordinatorTestGlobals = exposeCoordinatorTestGlobals;
