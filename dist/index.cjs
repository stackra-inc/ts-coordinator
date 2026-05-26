'use strict';

var react = require('react');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');

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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

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
        function hasMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata2);
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
  if (propertyKey !== void 0) {
    return Reflect.getMetadata(metadataKey, target, propertyKey);
  } else {
    return Reflect.getMetadata(metadataKey, target);
  }
}
function hasMetadata(metadataKey, target, propertyKey) {
  {
    return Reflect.hasMetadata(metadataKey, target);
  }
}
function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
  {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }
}
function updateMetadata(metadataKey, defaultMetadataValue, callback, target, propertyKey) {
  const currentMetadataValue = hasMetadata(metadataKey, target) ? getMetadata(metadataKey, target, propertyKey) : defaultMetadataValue;
  const updatedMetadataValue = callback(currentMetadataValue);
  defineMetadata(metadataKey, updatedMetadataValue, target);
}
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass2 = (decorators, target, key, kind) => {
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
var PARAMTYPES_METADATA = "design:paramtypes";
var SELF_DECLARED_DEPS_METADATA = "self:paramtypes";
var OPTIONAL_DEPS_METADATA = "optional:paramtypes";
var PROPERTY_DEPS_METADATA = "self:properties_metadata";
var OPTIONAL_PROPERTY_DEPS_METADATA = "optional:properties_metadata";
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
DiscoveryService = __decorateClass2([
  Injectable()
], DiscoveryService);

// node_modules/.pnpm/@stackra+ts-container@https+++codeload.github.com+stackra-inc+ts-container+tar.gz+38bc4_5c5ef5c5afc02c43cdf8b88e795dd1b3/node_modules/@stackra/ts-container/dist/index.js
__toESM(require_Reflect());
function Inject(token) {
  const hasExplicitToken = arguments.length > 0;
  return (target, key, index) => {
    let resolvedToken = token;
    if (!resolvedToken && !hasExplicitToken) {
      if (key !== void 0) {
        resolvedToken = getMetadata("design:type", target, key);
      } else if (index !== void 0) {
        const paramTypes = getMetadata(PARAMTYPES_METADATA, target) ?? [];
        resolvedToken = paramTypes[index];
      }
    }
    if (resolvedToken && typeof resolvedToken === "object" && "forwardRef" in resolvedToken) {
      const thunk = resolvedToken.forwardRef;
      resolvedToken = typeof thunk === "function" ? thunk() : thunk;
    }
    if (index !== void 0) {
      updateMetadata(
        SELF_DECLARED_DEPS_METADATA,
        [],
        (deps) => [...deps, { index, param: resolvedToken }],
        target
      );
    } else {
      updateMetadata(
        PROPERTY_DEPS_METADATA,
        [],
        (props) => [
          ...props,
          { key, type: resolvedToken }
        ],
        target.constructor
      );
    }
  };
}
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
function Optional() {
  return (target, key, index) => {
    if (index !== void 0) {
      updateMetadata(
        OPTIONAL_DEPS_METADATA,
        [],
        (indices) => [...indices, index],
        target
      );
    } else {
      updateMetadata(
        OPTIONAL_PROPERTY_DEPS_METADATA,
        [],
        (keys) => [...keys, key],
        target.constructor
      );
    }
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
Reflector = __decorateClass2([
  Injectable()
], Reflector);
var DiscoveryModule = class {
};
DiscoveryModule = __decorateClass2([
  Global(),
  Module({
    providers: [DiscoveryService],
    exports: [DiscoveryService]
  })
], DiscoveryModule);

// node_modules/.pnpm/@stackra+contracts@https+++codeload.github.com+stackra-inc+contracts+tar.gz+195bfa165411057dee5107275b1605469c39781e/node_modules/@stackra/contracts/dist/index.js
var COORDINATOR_CONFIG = /* @__PURE__ */ Symbol.for("COORDINATOR_CONFIG");
var TAB_COORDINATOR = /* @__PURE__ */ Symbol.for("TAB_COORDINATOR");
var TAB_LOCK_MANAGER = /* @__PURE__ */ Symbol.for("TAB_LOCK_MANAGER");

// node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/core.mjs
var LogLevels = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
};
var LogTypes = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: LogLevels.fatal
  },
  error: {
    level: LogLevels.error
  },
  // Level 1
  warn: {
    level: LogLevels.warn
  },
  // Level 2
  log: {
    level: LogLevels.log
  },
  // Level 3
  info: {
    level: LogLevels.info
  },
  success: {
    level: LogLevels.success
  },
  fail: {
    level: LogLevels.fail
  },
  ready: {
    level: LogLevels.info
  },
  start: {
    level: LogLevels.info
  },
  box: {
    level: LogLevels.info
  },
  // Level 4
  debug: {
    level: LogLevels.debug
  },
  // Level 5
  trace: {
    level: LogLevels.trace
  },
  // Verbose
  verbose: {
    level: LogLevels.verbose
  }
};
function isPlainObject$1(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$1(defaults)) {
    return _defu(baseObject, {}, namespace);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString());
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, ""), {})
  );
}
var defu = createDefu();
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj(arg) {
  if (!isPlainObject(arg)) {
    return false;
  }
  if (!arg.message && !arg.args) {
    return false;
  }
  if (arg.stack) {
    return false;
  }
  return true;
}
var paused = false;
var queue = [];
var Consola = class _Consola2 {
  options;
  _lastLog;
  _mockFn;
  /**
   * Creates an instance of Consola with specified options or defaults.
   *
   * @param {Partial<ConsolaOptions>} [options={}] - Configuration options for the Consola instance.
   */
  constructor(options = {}) {
    const types = options.types || LogTypes;
    this.options = defu(
      {
        ...options,
        defaults: { ...options.defaults },
        level: _normalizeLogLevel(options.level, types),
        reporters: [...options.reporters || []]
      },
      {
        types: LogTypes,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: true,
          colors: false,
          compact: true
        }
      }
    );
    for (const type in types) {
      const defaults = {
        type,
        ...this.options.defaults,
        ...types[type]
      };
      this[type] = this._wrapLogFn(defaults);
      this[type].raw = this._wrapLogFn(
        defaults,
        true
      );
    }
    if (this.options.mockFn) {
      this.mockTypes();
    }
    this._lastLog = {};
  }
  /**
   * Gets the current log level of the Consola instance.
   *
   * @returns {number} The current log level.
   */
  get level() {
    return this.options.level;
  }
  /**
   * Sets the minimum log level that will be output by the instance.
   *
   * @param {number} level - The new log level to set.
   */
  set level(level) {
    this.options.level = _normalizeLogLevel(
      level,
      this.options.types,
      this.options.level
    );
  }
  /**
   * Displays a prompt to the user and returns the response.
   * Throw an error if `prompt` is not supported by the current configuration.
   *
   * @template T
   * @param {string} message - The message to display in the prompt.
   * @param {T} [opts] - Optional options for the prompt. See {@link PromptOptions}.
   * @returns {promise<T>} A promise that infer with the prompt options. See {@link PromptOptions}.
   */
  prompt(message, opts) {
    if (!this.options.prompt) {
      throw new Error("prompt is not supported!");
    }
    return this.options.prompt(message, opts);
  }
  /**
   * Creates a new instance of Consola, inheriting options from the current instance, with possible overrides.
   *
   * @param {Partial<ConsolaOptions>} options - Optional overrides for the new instance. See {@link ConsolaOptions}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  create(options) {
    const instance = new _Consola2({
      ...this.options,
      ...options
    });
    if (this._mockFn) {
      instance.mockTypes(this._mockFn);
    }
    return instance;
  }
  /**
   * Creates a new Consola instance with the specified default log object properties.
   *
   * @param {InputLogObject} defaults - Default properties to include in any log from the new instance. See {@link InputLogObject}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withDefaults(defaults) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...defaults
      }
    });
  }
  /**
   * Creates a new Consola instance with a specified tag, which will be included in every log.
   *
   * @param {string} tag - The tag to include in each log of the new instance.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withTag(tag) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag
    });
  }
  /**
   * Adds a custom reporter to the Consola instance.
   * Reporters will be called for each log message, depending on their implementation and log level.
   *
   * @param {ConsolaReporter} reporter - The reporter to add. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  addReporter(reporter) {
    this.options.reporters.push(reporter);
    return this;
  }
  /**
   * Removes a custom reporter from the Consola instance.
   * If no reporter is specified, all reporters will be removed.
   *
   * @param {ConsolaReporter} reporter - The reporter to remove. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  removeReporter(reporter) {
    if (reporter) {
      const i = this.options.reporters.indexOf(reporter);
      if (i !== -1) {
        return this.options.reporters.splice(i, 1);
      }
    } else {
      this.options.reporters.splice(0);
    }
    return this;
  }
  /**
   * Replaces all reporters of the Consola instance with the specified array of reporters.
   *
   * @param {ConsolaReporter[]} reporters - The new reporters to set. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  setReporters(reporters) {
    this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
    return this;
  }
  wrapAll() {
    this.wrapConsole();
    this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole();
    this.restoreStd();
  }
  /**
   * Overrides console methods with Consola logging methods for consistent logging.
   */
  wrapConsole() {
    for (const type in this.options.types) {
      if (!console["__" + type]) {
        console["__" + type] = console[type];
      }
      console[type] = this[type].raw;
    }
  }
  /**
   * Restores the original console methods, removing Consola overrides.
   */
  restoreConsole() {
    for (const type in this.options.types) {
      if (console["__" + type]) {
        console[type] = console["__" + type];
        delete console["__" + type];
      }
    }
  }
  /**
   * Overrides standard output and error streams to redirect them through Consola.
   */
  wrapStd() {
    this._wrapStream(this.options.stdout, "log");
    this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(stream, type) {
    if (!stream) {
      return;
    }
    if (!stream.__write) {
      stream.__write = stream.write;
    }
    stream.write = (data) => {
      this[type].raw(String(data).trim());
    };
  }
  /**
   * Restores the original standard output and error streams, removing the Consola redirection.
   */
  restoreStd() {
    this._restoreStream(this.options.stdout);
    this._restoreStream(this.options.stderr);
  }
  _restoreStream(stream) {
    if (!stream) {
      return;
    }
    if (stream.__write) {
      stream.write = stream.__write;
      delete stream.__write;
    }
  }
  /**
   * Pauses logging, queues incoming logs until resumed.
   */
  pauseLogs() {
    paused = true;
  }
  /**
   * Resumes logging, processing any queued logs.
   */
  resumeLogs() {
    paused = false;
    const _queue = queue.splice(0);
    for (const item of _queue) {
      item[0]._logFn(item[1], item[2]);
    }
  }
  /**
   * Replaces logging methods with mocks if a mock function is provided.
   *
   * @param {ConsolaOptions["mockFn"]} mockFn - The function to use for mocking logging methods. See {@link ConsolaOptions["mockFn"]}.
   */
  mockTypes(mockFn) {
    const _mockFn = mockFn || this.options.mockFn;
    this._mockFn = _mockFn;
    if (typeof _mockFn !== "function") {
      return;
    }
    for (const type in this.options.types) {
      this[type] = _mockFn(type, this.options.types[type]) || this[type];
      this[type].raw = this[type];
    }
  }
  _wrapLogFn(defaults, isRaw) {
    return (...args) => {
      if (paused) {
        queue.push([this, defaults, args, isRaw]);
        return;
      }
      return this._logFn(defaults, args, isRaw);
    };
  }
  _logFn(defaults, args, isRaw) {
    if ((defaults.level || 0) > this.level) {
      return false;
    }
    const logObj = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...defaults,
      level: _normalizeLogLevel(defaults.level, this.options.types)
    };
    if (!isRaw && args.length === 1 && isLogObj(args[0])) {
      Object.assign(logObj, args[0]);
    } else {
      logObj.args = [...args];
    }
    if (logObj.message) {
      logObj.args.unshift(logObj.message);
      delete logObj.message;
    }
    if (logObj.additional) {
      if (!Array.isArray(logObj.additional)) {
        logObj.additional = logObj.additional.split("\n");
      }
      logObj.args.push("\n" + logObj.additional.join("\n"));
      delete logObj.additional;
    }
    logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
    logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
    const resolveLog = (newLog = false) => {
      const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && repeated > 0) {
        const args2 = [...this._lastLog.object.args];
        if (repeated > 1) {
          args2.push(`(repeated ${repeated} times)`);
        }
        this._log({ ...this._lastLog.object, args: args2 });
        this._lastLog.count = 1;
      }
      if (newLog) {
        this._lastLog.object = logObj;
        this._log(logObj);
      }
    };
    clearTimeout(this._lastLog.timeout);
    const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
    this._lastLog.time = logObj.date;
    if (diffTime < this.options.throttle) {
      try {
        const serializedLog = JSON.stringify([
          logObj.type,
          logObj.tag,
          logObj.args
        ]);
        const isSameLog = this._lastLog.serialized === serializedLog;
        this._lastLog.serialized = serializedLog;
        if (isSameLog) {
          this._lastLog.count = (this._lastLog.count || 0) + 1;
          if (this._lastLog.count > this.options.throttleMin) {
            this._lastLog.timeout = setTimeout(
              resolveLog,
              this.options.throttle
            );
            return;
          }
        }
      } catch {
      }
    }
    resolveLog(true);
  }
  _log(logObj) {
    for (const reporter of this.options.reporters) {
      reporter.log(logObj, {
        options: this.options
      });
    }
  }
};
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel;
  }
  if (typeof input === "number") {
    return input;
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level;
  }
  return defaultLevel;
}
Consola.prototype.add = Consola.prototype.addReporter;
Consola.prototype.remove = Consola.prototype.removeReporter;
Consola.prototype.clear = Consola.prototype.removeReporter;
Consola.prototype.withScope = Consola.prototype.withTag;
Consola.prototype.mock = Consola.prototype.mockTypes;
Consola.prototype.pause = Consola.prototype.pauseLogs;
Consola.prototype.resume = Consola.prototype.resumeLogs;
function createConsola(options = {}) {
  return new Consola(options);
}

// node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/browser.mjs
var BrowserReporter = class {
  options;
  defaultColor;
  levelColorMap;
  typeColorMap;
  constructor(options) {
    this.options = { ...options };
    this.defaultColor = "#7f8c8d";
    this.levelColorMap = {
      0: "#c0392b",
      // Red
      1: "#f39c12",
      // Yellow
      3: "#00BCD4"
      // Cyan
    };
    this.typeColorMap = {
      success: "#2ecc71"
      // Green
    };
  }
  _getLogFn(level) {
    if (level < 1) {
      return console.__error || console.error;
    }
    if (level === 1) {
      return console.__warn || console.warn;
    }
    return console.__log || console.log;
  }
  log(logObj) {
    const consoleLogFn = this._getLogFn(logObj.level);
    const type = logObj.type === "log" ? "" : logObj.type;
    const tag = logObj.tag || "";
    const color = this.typeColorMap[logObj.type] || this.levelColorMap[logObj.level] || this.defaultColor;
    const style = `
      background: ${color};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `;
    const badge = `%c${[tag, type].filter(Boolean).join(":")}`;
    if (typeof logObj.args[0] === "string") {
      consoleLogFn(
        `${badge}%c ${logObj.args[0]}`,
        style,
        // Empty string as style resets to default console style
        "",
        ...logObj.args.slice(1)
      );
    } else {
      consoleLogFn(badge, style, ...logObj.args);
    }
  }
};
function createConsola2(options = {}) {
  const consola2 = createConsola({
    reporters: options.reporters || [new BrowserReporter({})],
    prompt(message, options2 = {}) {
      if (options2.type === "confirm") {
        return Promise.resolve(confirm(message));
      }
      return Promise.resolve(prompt(message));
    },
    ...options
  });
  return consola2;
}
createConsola2();

// node_modules/.pnpm/@stackra+ts-logger@https+++codeload.github.com+stackra-inc+ts-logger+tar.gz+d2c169220da_61f8f26d6fa9a8604b83ebb789d8e194/node_modules/@stackra/ts-logger/dist/index.js
var __create2 = Object.create;
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp3(target, "default", { value: mod, enumerable: true }),
  mod
));
var __decorateClass3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __decorateParam2 = (index, decorator) => (target, key) => decorator(target, key, index);
var require_Reflect2 = __commonJS2({
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
        function defineMetadata4(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata4);
        function hasMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata2);
        function hasOwnMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata2);
        function getMetadata4(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata4);
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
          var hint = "string";
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
          var valueOf, result;
          {
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
            argument
          );
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
          var defineMetadata5 = reflect.defineMetadata, hasOwnMetadata3 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
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
            OrdinaryDefineOwnMetadata: defineMetadata5,
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
var require_symbol_iterator = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/symbol.iterator.js"(exports, module) {
    module.exports = function SymbolIterator() {
      var _this = this;
      var index = -1;
      return {
        next: function next() {
          index += 1;
          return {
            value: _this.items[index],
            done: index >= _this.items.length
          };
        }
      };
    };
  }
});
var require_all = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/all.js"(exports, module) {
    module.exports = function all() {
      return this.items;
    };
  }
});
var require_is = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/is.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = {
      /**
       * @returns {boolean}
       */
      isArray: function isArray(item) {
        return Array.isArray(item);
      },
      /**
       * @returns {boolean}
       */
      isObject: function isObject(item) {
        return _typeof(item) === "object" && Array.isArray(item) === false && item !== null;
      },
      /**
       * @returns {boolean}
       */
      isFunction: function isFunction(item) {
        return typeof item === "function";
      }
    };
  }
});
var require_average = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/average.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function average(key) {
      if (key === void 0) {
        return this.sum() / this.items.length;
      }
      if (isFunction(key)) {
        return new this.constructor(this.items).sum(key) / this.items.length;
      }
      return new this.constructor(this.items).pluck(key).sum() / this.items.length;
    };
  }
});
var require_avg = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/avg.js"(exports, module) {
    var average = require_average();
    module.exports = average;
  }
});
var require_chunk = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/chunk.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function chunk(size) {
      var _this = this;
      var chunks = [];
      var index = 0;
      if (Array.isArray(this.items)) {
        do {
          var items = this.items.slice(index, index + size);
          var collection = new this.constructor(items);
          chunks.push(collection);
          index += size;
        } while (index < this.items.length);
      } else if (_typeof(this.items) === "object") {
        var keys = Object.keys(this.items);
        var _loop = function _loop2() {
          var keysOfChunk = keys.slice(index, index + size);
          var collection2 = new _this.constructor({});
          keysOfChunk.forEach(function(key) {
            return collection2.put(key, _this.items[key]);
          });
          chunks.push(collection2);
          index += size;
        };
        do {
          _loop();
        } while (index < keys.length);
      } else {
        chunks.push(new this.constructor([this.items]));
      }
      return new this.constructor(chunks);
    };
  }
});
var require_collapse = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/collapse.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function collapse() {
      var _ref;
      return new this.constructor((_ref = []).concat.apply(_ref, _toConsumableArray(this.items)));
    };
  }
});
var require_combine = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/combine.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function combine(array) {
      var _this = this;
      var values = array;
      if (values instanceof this.constructor) {
        values = array.all();
      }
      var collection = {};
      if (Array.isArray(this.items) && Array.isArray(values)) {
        this.items.forEach(function(key, iterator) {
          collection[key] = values[iterator];
        });
      } else if (_typeof(this.items) === "object" && _typeof(values) === "object") {
        Object.keys(this.items).forEach(function(key, index) {
          collection[_this.items[key]] = values[Object.keys(values)[index]];
        });
      } else if (Array.isArray(this.items)) {
        collection[this.items[0]] = values;
      } else if (typeof this.items === "string" && Array.isArray(values)) {
        var _values = values;
        var _values2 = _slicedToArray(_values, 1);
        collection[this.items] = _values2[0];
      } else if (typeof this.items === "string") {
        collection[this.items] = values;
      }
      return new this.constructor(collection);
    };
  }
});
var require_clone = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/clone.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function clone(items) {
      var cloned;
      if (Array.isArray(items)) {
        var _cloned;
        cloned = [];
        (_cloned = cloned).push.apply(_cloned, _toConsumableArray(items));
      } else {
        cloned = {};
        Object.keys(items).forEach(function(prop) {
          cloned[prop] = items[prop];
        });
      }
      return cloned;
    };
  }
});
var require_concat = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/concat.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    var clone = require_clone();
    module.exports = function concat(collectionOrArrayOrObject) {
      var list = collectionOrArrayOrObject;
      if (collectionOrArrayOrObject instanceof this.constructor) {
        list = collectionOrArrayOrObject.all();
      } else if (_typeof(collectionOrArrayOrObject) === "object") {
        list = [];
        Object.keys(collectionOrArrayOrObject).forEach(function(property) {
          list.push(collectionOrArrayOrObject[property]);
        });
      }
      var collection = clone(this.items);
      list.forEach(function(item) {
        if (_typeof(item) === "object") {
          Object.keys(item).forEach(function(key) {
            return collection.push(item[key]);
          });
        } else {
          collection.push(item);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_values = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/values.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function values(items) {
      var valuesArray = [];
      if (Array.isArray(items)) {
        valuesArray.push.apply(valuesArray, _toConsumableArray(items));
      } else if (items.constructor.name === "Collection") {
        valuesArray.push.apply(valuesArray, _toConsumableArray(items.all()));
      } else {
        Object.keys(items).forEach(function(prop) {
          return valuesArray.push(items[prop]);
        });
      }
      return valuesArray;
    };
  }
});
var require_contains = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/contains.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var values = require_values();
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function contains(key, value) {
      if (value !== void 0) {
        if (Array.isArray(this.items)) {
          return this.items.filter(function(items) {
            return items[key] !== void 0 && items[key] === value;
          }).length > 0;
        }
        return this.items[key] !== void 0 && this.items[key] === value;
      }
      if (isFunction(key)) {
        return this.items.filter(function(item, index) {
          return key(item, index);
        }).length > 0;
      }
      if (Array.isArray(this.items)) {
        return this.items.indexOf(key) !== -1;
      }
      var keysAndValues = values(this.items);
      keysAndValues.push.apply(keysAndValues, _toConsumableArray(Object.keys(this.items)));
      return keysAndValues.indexOf(key) !== -1;
    };
  }
});
var require_containsOneItem = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/containsOneItem.js"(exports, module) {
    module.exports = function containsOneItem() {
      return this.count() === 1;
    };
  }
});
var require_count = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/count.js"(exports, module) {
    module.exports = function count() {
      var arrayLength = 0;
      if (Array.isArray(this.items)) {
        arrayLength = this.items.length;
      }
      return Math.max(Object.keys(this.items).length, arrayLength);
    };
  }
});
var require_countBy = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/countBy.js"(exports, module) {
    module.exports = function countBy() {
      var fn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(value) {
        return value;
      };
      return new this.constructor(this.items).groupBy(fn).map(function(value) {
        return value.count();
      });
    };
  }
});
var require_crossJoin = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/crossJoin.js"(exports, module) {
    module.exports = function crossJoin() {
      function join(collection, constructor, args) {
        var current = args[0];
        if (current instanceof constructor) {
          current = current.all();
        }
        var rest = args.slice(1);
        var last = !rest.length;
        var result = [];
        for (var i = 0; i < current.length; i += 1) {
          var collectionCopy = collection.slice();
          collectionCopy.push(current[i]);
          if (last) {
            result.push(collectionCopy);
          } else {
            result = result.concat(join(collectionCopy, constructor, rest));
          }
        }
        return result;
      }
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return new this.constructor(join([], this.constructor, [].concat([this.items], values)));
    };
  }
});
var require_dd = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/dd.js"(exports, module) {
    module.exports = function dd() {
      this.dump();
      if (typeof process !== "undefined") {
        process.exit(1);
      }
    };
  }
});
var require_diff = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diff.js"(exports, module) {
    module.exports = function diff(values) {
      var valuesToDiff;
      if (values instanceof this.constructor) {
        valuesToDiff = values.all();
      } else {
        valuesToDiff = values;
      }
      var collection = this.items.filter(function(item) {
        return valuesToDiff.indexOf(item) === -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_diffAssoc = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffAssoc.js"(exports, module) {
    module.exports = function diffAssoc(values) {
      var _this = this;
      var diffValues = values;
      if (values instanceof this.constructor) {
        diffValues = values.all();
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (diffValues[key] === void 0 || diffValues[key] !== _this.items[key]) {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_diffKeys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffKeys.js"(exports, module) {
    module.exports = function diffKeys(object) {
      var objectToDiff;
      if (object instanceof this.constructor) {
        objectToDiff = object.all();
      } else {
        objectToDiff = object;
      }
      var objectKeys = Object.keys(objectToDiff);
      var remainingKeys = Object.keys(this.items).filter(function(item) {
        return objectKeys.indexOf(item) === -1;
      });
      return new this.constructor(this.items).only(remainingKeys);
    };
  }
});
var require_diffUsing = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffUsing.js"(exports, module) {
    module.exports = function diffUsing(values, callback) {
      var collection = this.items.filter(function(item) {
        return !(values && values.some(function(otherItem) {
          return callback(item, otherItem) === 0;
        }));
      });
      return new this.constructor(collection);
    };
  }
});
var require_doesntContain = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/doesntContain.js"(exports, module) {
    module.exports = function contains(key, value) {
      return !this.contains(key, value);
    };
  }
});
var require_dump = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/dump.js"(exports, module) {
    module.exports = function dump() {
      console.log(this);
      return this;
    };
  }
});
var require_duplicates = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/duplicates.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function duplicates() {
      var _this = this;
      var occuredValues = [];
      var duplicateValues = {};
      var stringifiedValue = function stringifiedValue2(value) {
        if (Array.isArray(value) || _typeof(value) === "object") {
          return JSON.stringify(value);
        }
        return value;
      };
      if (Array.isArray(this.items)) {
        this.items.forEach(function(value, index) {
          var valueAsString = stringifiedValue(value);
          if (occuredValues.indexOf(valueAsString) === -1) {
            occuredValues.push(valueAsString);
          } else {
            duplicateValues[index] = value;
          }
        });
      } else if (_typeof(this.items) === "object") {
        Object.keys(this.items).forEach(function(key) {
          var valueAsString = stringifiedValue(_this.items[key]);
          if (occuredValues.indexOf(valueAsString) === -1) {
            occuredValues.push(valueAsString);
          } else {
            duplicateValues[key] = _this.items[key];
          }
        });
      }
      return new this.constructor(duplicateValues);
    };
  }
});
var require_each = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/each.js"(exports, module) {
    module.exports = function each(fn) {
      var stop = false;
      if (Array.isArray(this.items)) {
        var length = this.items.length;
        for (var index = 0; index < length && !stop; index += 1) {
          stop = fn(this.items[index], index, this.items) === false;
        }
      } else {
        var keys = Object.keys(this.items);
        var _length = keys.length;
        for (var _index = 0; _index < _length && !stop; _index += 1) {
          var key = keys[_index];
          stop = fn(this.items[key], key, this.items) === false;
        }
      }
      return this;
    };
  }
});
var require_eachSpread = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/eachSpread.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function eachSpread(fn) {
      this.each(function(values, key) {
        fn.apply(void 0, _toConsumableArray(values).concat([key]));
      });
      return this;
    };
  }
});
var require_every = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/every.js"(exports, module) {
    var values = require_values();
    module.exports = function every(fn) {
      var items = values(this.items);
      return items.every(fn);
    };
  }
});
var require_variadic = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/variadic.js"(exports, module) {
    module.exports = function variadic(args) {
      if (Array.isArray(args[0])) {
        return args[0];
      }
      return args;
    };
  }
});
var require_except = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/except.js"(exports, module) {
    var variadic = require_variadic();
    module.exports = function except() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      if (Array.isArray(this.items)) {
        var _collection = this.items.filter(function(item) {
          return properties.indexOf(item) === -1;
        });
        return new this.constructor(_collection);
      }
      var collection = {};
      Object.keys(this.items).forEach(function(property) {
        if (properties.indexOf(property) === -1) {
          collection[property] = _this.items[property];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_filter = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/filter.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function falsyValue(item) {
      if (Array.isArray(item)) {
        if (item.length) {
          return false;
        }
      } else if (item !== void 0 && item !== null && _typeof(item) === "object") {
        if (Object.keys(item).length) {
          return false;
        }
      } else if (item) {
        return false;
      }
      return true;
    }
    function filterObject(func, items) {
      var result = {};
      Object.keys(items).forEach(function(key) {
        if (func) {
          if (func(items[key], key)) {
            result[key] = items[key];
          }
        } else if (!falsyValue(items[key])) {
          result[key] = items[key];
        }
      });
      return result;
    }
    function filterArray(func, items) {
      if (func) {
        return items.filter(func);
      }
      var result = [];
      for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        if (!falsyValue(item)) {
          result.push(item);
        }
      }
      return result;
    }
    module.exports = function filter(fn) {
      var func = fn || false;
      var filteredItems = null;
      if (Array.isArray(this.items)) {
        filteredItems = filterArray(func, this.items);
      } else {
        filteredItems = filterObject(func, this.items);
      }
      return new this.constructor(filteredItems);
    };
  }
});
var require_first = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/first.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function first(fn, defaultValue) {
      if (isFunction(fn)) {
        var keys = Object.keys(this.items);
        for (var i = 0; i < keys.length; i += 1) {
          var key = keys[i];
          var item = this.items[key];
          if (fn(item, key)) {
            return item;
          }
        }
        if (isFunction(defaultValue)) {
          return defaultValue();
        }
        return defaultValue;
      }
      if (Array.isArray(this.items) && this.items.length || Object.keys(this.items).length) {
        if (Array.isArray(this.items)) {
          return this.items[0];
        }
        var firstKey = Object.keys(this.items)[0];
        return this.items[firstKey];
      }
      if (isFunction(defaultValue)) {
        return defaultValue();
      }
      return defaultValue;
    };
  }
});
var require_firstOrFail = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/firstOrFail.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function firstOrFail(key, operator, value) {
      if (isFunction(key)) {
        return this.first(key, function() {
          throw new Error("Item not found.");
        });
      }
      var collection = this.where(key, operator, value);
      if (collection.isEmpty()) {
        throw new Error("Item not found.");
      }
      return collection.first();
    };
  }
});
var require_firstWhere = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/firstWhere.js"(exports, module) {
    module.exports = function firstWhere(key, operator, value) {
      return this.where(key, operator, value).first() || null;
    };
  }
});
var require_flatMap = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flatMap.js"(exports, module) {
    module.exports = function flatMap(fn) {
      return this.map(fn).collapse();
    };
  }
});
var require_flatten = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flatten.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    module.exports = function flatten(depth) {
      var flattenDepth = depth || Infinity;
      var fullyFlattened = false;
      var collection = [];
      var flat = function flat2(items) {
        collection = [];
        if (isArray(items)) {
          items.forEach(function(item) {
            if (isArray(item)) {
              collection = collection.concat(item);
            } else if (isObject(item)) {
              Object.keys(item).forEach(function(property) {
                collection = collection.concat(item[property]);
              });
            } else {
              collection.push(item);
            }
          });
        } else {
          Object.keys(items).forEach(function(property) {
            if (isArray(items[property])) {
              collection = collection.concat(items[property]);
            } else if (isObject(items[property])) {
              Object.keys(items[property]).forEach(function(prop) {
                collection = collection.concat(items[property][prop]);
              });
            } else {
              collection.push(items[property]);
            }
          });
        }
        fullyFlattened = collection.filter(function(item) {
          return isObject(item);
        });
        fullyFlattened = fullyFlattened.length === 0;
        flattenDepth -= 1;
      };
      flat(this.items);
      while (!fullyFlattened && flattenDepth > 0) {
        flat(collection);
      }
      return new this.constructor(collection);
    };
  }
});
var require_flip = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flip.js"(exports, module) {
    module.exports = function flip() {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        Object.keys(this.items).forEach(function(key) {
          collection[_this.items[key]] = Number(key);
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          collection[_this.items[key]] = key;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_forPage = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/forPage.js"(exports, module) {
    module.exports = function forPage(page, chunk) {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        collection = this.items.slice(page * chunk - chunk, page * chunk);
      } else {
        Object.keys(this.items).slice(page * chunk - chunk, page * chunk).forEach(function(key) {
          collection[key] = _this.items[key];
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_forget = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/forget.js"(exports, module) {
    module.exports = function forget(key) {
      if (Array.isArray(this.items)) {
        this.items.splice(key, 1);
      } else {
        delete this.items[key];
      }
      return this;
    };
  }
});
var require_get = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/get.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (this.items[key] !== void 0) {
        return this.items[key];
      }
      if (isFunction(defaultValue)) {
        return defaultValue();
      }
      if (defaultValue !== null) {
        return defaultValue;
      }
      return null;
    };
  }
});
var require_nestedValue = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/nestedValue.js"(exports, module) {
    module.exports = function nestedValue(mainObject, key) {
      try {
        return key.split(".").reduce(function(obj, property) {
          return obj[property];
        }, mainObject);
      } catch (err) {
        return mainObject;
      }
    };
  }
});
var require_groupBy = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/groupBy.js"(exports, module) {
    var nestedValue = require_nestedValue();
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function groupBy(key) {
      var _this = this;
      var collection = {};
      this.items.forEach(function(item, index) {
        var resolvedKey;
        if (isFunction(key)) {
          resolvedKey = key(item, index);
        } else if (nestedValue(item, key) || nestedValue(item, key) === 0) {
          resolvedKey = nestedValue(item, key);
        } else {
          resolvedKey = "";
        }
        if (collection[resolvedKey] === void 0) {
          collection[resolvedKey] = new _this.constructor([]);
        }
        collection[resolvedKey].push(item);
      });
      return new this.constructor(collection);
    };
  }
});
var require_has = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/has.js"(exports, module) {
    var variadic = require_variadic();
    module.exports = function has() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      return properties.filter(function(key) {
        return Object.hasOwnProperty.call(_this.items, key);
      }).length === properties.length;
    };
  }
});
var require_implode = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/implode.js"(exports, module) {
    module.exports = function implode(key, glue) {
      if (glue === void 0) {
        return this.items.join(key);
      }
      return new this.constructor(this.items).pluck(key).all().join(glue);
    };
  }
});
var require_intersect = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/intersect.js"(exports, module) {
    module.exports = function intersect(values) {
      var intersectValues = values;
      if (values instanceof this.constructor) {
        intersectValues = values.all();
      }
      var collection = this.items.filter(function(item) {
        return intersectValues.indexOf(item) !== -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_intersectByKeys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/intersectByKeys.js"(exports, module) {
    module.exports = function intersectByKeys(values) {
      var _this = this;
      var intersectKeys = Object.keys(values);
      if (values instanceof this.constructor) {
        intersectKeys = Object.keys(values.all());
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (intersectKeys.indexOf(key) !== -1) {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_isEmpty = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/isEmpty.js"(exports, module) {
    module.exports = function isEmpty() {
      if (Array.isArray(this.items)) {
        return !this.items.length;
      }
      return !Object.keys(this.items).length;
    };
  }
});
var require_isNotEmpty = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/isNotEmpty.js"(exports, module) {
    module.exports = function isNotEmpty() {
      return !this.isEmpty();
    };
  }
});
var require_join = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/join.js"(exports, module) {
    module.exports = function join(glue, finalGlue) {
      var collection = this.values();
      if (finalGlue === void 0) {
        return collection.implode(glue);
      }
      var count = collection.count();
      if (count === 0) {
        return "";
      }
      if (count === 1) {
        return collection.last();
      }
      var finalItem = collection.pop();
      return collection.implode(glue) + finalGlue + finalItem;
    };
  }
});
var require_keyBy = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/keyBy.js"(exports, module) {
    var nestedValue = require_nestedValue();
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function keyBy(key) {
      var collection = {};
      if (isFunction(key)) {
        this.items.forEach(function(item) {
          collection[key(item)] = item;
        });
      } else {
        this.items.forEach(function(item) {
          var keyValue = nestedValue(item, key);
          collection[keyValue || ""] = item;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_keys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/keys.js"(exports, module) {
    module.exports = function keys() {
      var collection = Object.keys(this.items);
      if (Array.isArray(this.items)) {
        collection = collection.map(Number);
      }
      return new this.constructor(collection);
    };
  }
});
var require_last = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/last.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function last(fn, defaultValue) {
      var items = this.items;
      if (isFunction(fn)) {
        items = this.filter(fn).all();
      }
      if (Array.isArray(items) && !items.length || !Object.keys(items).length) {
        if (isFunction(defaultValue)) {
          return defaultValue();
        }
        return defaultValue;
      }
      if (Array.isArray(items)) {
        return items[items.length - 1];
      }
      var keys = Object.keys(items);
      return items[keys[keys.length - 1]];
    };
  }
});
var require_macro = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/macro.js"(exports, module) {
    module.exports = function macro(name, fn) {
      this.constructor.prototype[name] = fn;
    };
  }
});
var require_make = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/make.js"(exports, module) {
    module.exports = function make() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return new this.constructor(items);
    };
  }
});
var require_map = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/map.js"(exports, module) {
    module.exports = function map(fn) {
      var _this = this;
      if (Array.isArray(this.items)) {
        return new this.constructor(this.items.map(fn));
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        collection[key] = fn(_this.items[key], key);
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapSpread = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapSpread.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function mapSpread(fn) {
      return this.map(function(values, key) {
        return fn.apply(void 0, _toConsumableArray(values).concat([key]));
      });
    };
  }
});
var require_mapToDictionary = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapToDictionary.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapToDictionary(fn) {
      var collection = {};
      this.items.forEach(function(item, k) {
        var _fn = fn(item, k), _fn2 = _slicedToArray(_fn, 2), key = _fn2[0], value = _fn2[1];
        if (collection[key] === void 0) {
          collection[key] = [value];
        } else {
          collection[key].push(value);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapInto = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapInto.js"(exports, module) {
    module.exports = function mapInto(ClassName) {
      return this.map(function(value, key) {
        return new ClassName(value, key);
      });
    };
  }
});
var require_mapToGroups = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapToGroups.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapToGroups(fn) {
      var collection = {};
      this.items.forEach(function(item, key) {
        var _fn = fn(item, key), _fn2 = _slicedToArray(_fn, 2), keyed = _fn2[0], value = _fn2[1];
        if (collection[keyed] === void 0) {
          collection[keyed] = [value];
        } else {
          collection[keyed].push(value);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapWithKeys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapWithKeys.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapWithKeys(fn) {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        this.items.forEach(function(item, index) {
          var _fn = fn(item, index), _fn2 = _slicedToArray(_fn, 2), keyed = _fn2[0], value = _fn2[1];
          collection[keyed] = value;
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          var _fn3 = fn(_this.items[key], key), _fn4 = _slicedToArray(_fn3, 2), keyed = _fn4[0], value = _fn4[1];
          collection[keyed] = value;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_max = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/max.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function max(key) {
      if (typeof key === "string") {
        var filtered = this.items.filter(function(item) {
          return item[key] !== void 0;
        });
        return Math.max.apply(Math, _toConsumableArray(filtered.map(function(item) {
          return item[key];
        })));
      }
      return Math.max.apply(Math, _toConsumableArray(this.items));
    };
  }
});
var require_median = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/median.js"(exports, module) {
    module.exports = function median(key) {
      var length = this.items.length;
      if (key === void 0) {
        if (length % 2 === 0) {
          return (this.items[length / 2 - 1] + this.items[length / 2]) / 2;
        }
        return this.items[Math.floor(length / 2)];
      }
      if (length % 2 === 0) {
        return (this.items[length / 2 - 1][key] + this.items[length / 2][key]) / 2;
      }
      return this.items[Math.floor(length / 2)][key];
    };
  }
});
var require_merge = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/merge.js"(exports, module) {
    module.exports = function merge(value) {
      var arrayOrObject = value;
      if (typeof arrayOrObject === "string") {
        arrayOrObject = [arrayOrObject];
      }
      if (Array.isArray(this.items) && Array.isArray(arrayOrObject)) {
        return new this.constructor(this.items.concat(arrayOrObject));
      }
      var collection = JSON.parse(JSON.stringify(this.items));
      Object.keys(arrayOrObject).forEach(function(key) {
        collection[key] = arrayOrObject[key];
      });
      return new this.constructor(collection);
    };
  }
});
var require_mergeRecursive = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mergeRecursive.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function mergeRecursive(items) {
      var merge = function merge2(target, source) {
        var merged = {};
        var mergedKeys = Object.keys(_objectSpread(_objectSpread({}, target), source));
        mergedKeys.forEach(function(key) {
          if (target[key] === void 0 && source[key] !== void 0) {
            merged[key] = source[key];
          } else if (target[key] !== void 0 && source[key] === void 0) {
            merged[key] = target[key];
          } else if (target[key] !== void 0 && source[key] !== void 0) {
            if (target[key] === source[key]) {
              merged[key] = target[key];
            } else if (!Array.isArray(target[key]) && _typeof(target[key]) === "object" && !Array.isArray(source[key]) && _typeof(source[key]) === "object") {
              merged[key] = merge2(target[key], source[key]);
            } else {
              merged[key] = [].concat(target[key], source[key]);
            }
          }
        });
        return merged;
      };
      if (!items) {
        return this;
      }
      if (items.constructor.name === "Collection") {
        return new this.constructor(merge(this.items, items.all()));
      }
      return new this.constructor(merge(this.items, items));
    };
  }
});
var require_min = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/min.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function min(key) {
      if (key !== void 0) {
        var filtered = this.items.filter(function(item) {
          return item[key] !== void 0;
        });
        return Math.min.apply(Math, _toConsumableArray(filtered.map(function(item) {
          return item[key];
        })));
      }
      return Math.min.apply(Math, _toConsumableArray(this.items));
    };
  }
});
var require_mode = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mode.js"(exports, module) {
    module.exports = function mode(key) {
      var values = [];
      var highestCount = 1;
      if (!this.items.length) {
        return null;
      }
      this.items.forEach(function(item) {
        var tempValues = values.filter(function(value) {
          if (key !== void 0) {
            return value.key === item[key];
          }
          return value.key === item;
        });
        if (!tempValues.length) {
          if (key !== void 0) {
            values.push({
              key: item[key],
              count: 1
            });
          } else {
            values.push({
              key: item,
              count: 1
            });
          }
        } else {
          tempValues[0].count += 1;
          var count = tempValues[0].count;
          if (count > highestCount) {
            highestCount = count;
          }
        }
      });
      return values.filter(function(value) {
        return value.count === highestCount;
      }).map(function(value) {
        return value.key;
      });
    };
  }
});
var require_nth = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/nth.js"(exports, module) {
    var values = require_values();
    module.exports = function nth(n) {
      var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var items = values(this.items);
      var collection = items.slice(offset).filter(function(item, index) {
        return index % n === 0;
      });
      return new this.constructor(collection);
    };
  }
});
var require_only = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/only.js"(exports, module) {
    var variadic = require_variadic();
    module.exports = function only() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      if (Array.isArray(this.items)) {
        var _collection = this.items.filter(function(item) {
          return properties.indexOf(item) !== -1;
        });
        return new this.constructor(_collection);
      }
      var collection = {};
      Object.keys(this.items).forEach(function(prop) {
        if (properties.indexOf(prop) !== -1) {
          collection[prop] = _this.items[prop];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_pad = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pad.js"(exports, module) {
    var clone = require_clone();
    module.exports = function pad(size, value) {
      var abs = Math.abs(size);
      var count = this.count();
      if (abs <= count) {
        return this;
      }
      var diff = abs - count;
      var items = clone(this.items);
      var isArray = Array.isArray(this.items);
      var prepend = size < 0;
      for (var iterator = 0; iterator < diff; ) {
        if (!isArray) {
          if (items[iterator] !== void 0) {
            diff += 1;
          } else {
            items[iterator] = value;
          }
        } else if (prepend) {
          items.unshift(value);
        } else {
          items.push(value);
        }
        iterator += 1;
      }
      return new this.constructor(items);
    };
  }
});
var require_partition = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/partition.js"(exports, module) {
    module.exports = function partition(fn) {
      var _this = this;
      var arrays;
      if (Array.isArray(this.items)) {
        arrays = [new this.constructor([]), new this.constructor([])];
        this.items.forEach(function(item) {
          if (fn(item) === true) {
            arrays[0].push(item);
          } else {
            arrays[1].push(item);
          }
        });
      } else {
        arrays = [new this.constructor({}), new this.constructor({})];
        Object.keys(this.items).forEach(function(prop) {
          var value = _this.items[prop];
          if (fn(value) === true) {
            arrays[0].put(prop, value);
          } else {
            arrays[1].put(prop, value);
          }
        });
      }
      return new this.constructor(arrays);
    };
  }
});
var require_pipe = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pipe.js"(exports, module) {
    module.exports = function pipe(fn) {
      return fn(this);
    };
  }
});
var require_pluck = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pluck.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var nestedValue = require_nestedValue();
    var buildKeyPathMap = function buildKeyPathMap2(items) {
      var keyPaths = {};
      items.forEach(function(item, index) {
        function buildKeyPath(val, keyPath) {
          if (isObject(val)) {
            Object.keys(val).forEach(function(prop) {
              buildKeyPath(val[prop], "".concat(keyPath, ".").concat(prop));
            });
          } else if (isArray(val)) {
            val.forEach(function(v, i) {
              buildKeyPath(v, "".concat(keyPath, ".").concat(i));
            });
          }
          keyPaths[keyPath] = val;
        }
        buildKeyPath(item, index);
      });
      return keyPaths;
    };
    module.exports = function pluck(value, key) {
      if (value.indexOf("*") !== -1) {
        var keyPathMap = buildKeyPathMap(this.items);
        var keyMatches = [];
        if (key !== void 0) {
          var keyRegex = new RegExp("0.".concat(key), "g");
          var keyNumberOfLevels = "0.".concat(key).split(".").length;
          Object.keys(keyPathMap).forEach(function(k) {
            var matchingKey = k.match(keyRegex);
            if (matchingKey) {
              var match = matchingKey[0];
              if (match.split(".").length === keyNumberOfLevels) {
                keyMatches.push(keyPathMap[match]);
              }
            }
          });
        }
        var valueMatches = [];
        var valueRegex = new RegExp("0.".concat(value), "g");
        var valueNumberOfLevels = "0.".concat(value).split(".").length;
        Object.keys(keyPathMap).forEach(function(k) {
          var matchingValue = k.match(valueRegex);
          if (matchingValue) {
            var match = matchingValue[0];
            if (match.split(".").length === valueNumberOfLevels) {
              valueMatches.push(keyPathMap[match]);
            }
          }
        });
        if (key !== void 0) {
          var collection = {};
          this.items.forEach(function(item, index) {
            collection[keyMatches[index] || ""] = valueMatches;
          });
          return new this.constructor(collection);
        }
        return new this.constructor([valueMatches]);
      }
      if (key !== void 0) {
        var _collection = {};
        this.items.forEach(function(item) {
          if (nestedValue(item, value) !== void 0) {
            _collection[item[key] || ""] = nestedValue(item, value);
          } else {
            _collection[item[key] || ""] = null;
          }
        });
        return new this.constructor(_collection);
      }
      return this.map(function(item) {
        if (nestedValue(item, value) !== void 0) {
          return nestedValue(item, value);
        }
        return null;
      });
    };
  }
});
var require_deleteKeys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/deleteKeys.js"(exports, module) {
    var variadic = require_variadic();
    module.exports = function deleteKeys(obj) {
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }
      variadic(keys).forEach(function(key) {
        delete obj[key];
      });
    };
  }
});
var require_pop = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pop.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var deleteKeys = require_deleteKeys();
    module.exports = function pop() {
      var _this = this;
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      if (this.isEmpty()) {
        return null;
      }
      if (isArray(this.items)) {
        if (count === 1) {
          return this.items.pop();
        }
        return new this.constructor(this.items.splice(-count));
      }
      if (isObject(this.items)) {
        var keys = Object.keys(this.items);
        if (count === 1) {
          var key = keys[keys.length - 1];
          var last = this.items[key];
          deleteKeys(this.items, key);
          return last;
        }
        var poppedKeys = keys.slice(-count);
        var newObject = poppedKeys.reduce(function(acc, current) {
          acc[current] = _this.items[current];
          return acc;
        }, {});
        deleteKeys(this.items, poppedKeys);
        return new this.constructor(newObject);
      }
      return null;
    };
  }
});
var require_prepend = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/prepend.js"(exports, module) {
    module.exports = function prepend(value, key) {
      if (key !== void 0) {
        return this.put(key, value);
      }
      this.items.unshift(value);
      return this;
    };
  }
});
var require_pull = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pull.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function pull(key, defaultValue) {
      var returnValue = this.items[key] || null;
      if (!returnValue && defaultValue !== void 0) {
        if (isFunction(defaultValue)) {
          returnValue = defaultValue();
        } else {
          returnValue = defaultValue;
        }
      }
      delete this.items[key];
      return returnValue;
    };
  }
});
var require_push = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/push.js"(exports, module) {
    module.exports = function push() {
      var _this$items;
      (_this$items = this.items).push.apply(_this$items, arguments);
      return this;
    };
  }
});
var require_put = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/put.js"(exports, module) {
    module.exports = function put(key, value) {
      this.items[key] = value;
      return this;
    };
  }
});
var require_random = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/random.js"(exports, module) {
    var values = require_values();
    module.exports = function random() {
      var length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      var items = values(this.items);
      var collection = new this.constructor(items).shuffle();
      if (length !== parseInt(length, 10)) {
        return collection.first();
      }
      return collection.take(length);
    };
  }
});
var require_reduce = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reduce.js"(exports, module) {
    module.exports = function reduce(fn, carry) {
      var _this = this;
      var reduceCarry = null;
      if (carry !== void 0) {
        reduceCarry = carry;
      }
      if (Array.isArray(this.items)) {
        this.items.forEach(function(item) {
          reduceCarry = fn(reduceCarry, item);
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          reduceCarry = fn(reduceCarry, _this.items[key], key);
        });
      }
      return reduceCarry;
    };
  }
});
var require_reject = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reject.js"(exports, module) {
    module.exports = function reject(fn) {
      return new this.constructor(this.items).filter(function(item) {
        return !fn(item);
      });
    };
  }
});
var require_replace = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/replace.js"(exports, module) {
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function replace(items) {
      if (!items) {
        return this;
      }
      if (Array.isArray(items)) {
        var _replaced = this.items.map(function(value, index) {
          return items[index] || value;
        });
        return new this.constructor(_replaced);
      }
      if (items.constructor.name === "Collection") {
        var _replaced2 = _objectSpread(_objectSpread({}, this.items), items.all());
        return new this.constructor(_replaced2);
      }
      var replaced = _objectSpread(_objectSpread({}, this.items), items);
      return new this.constructor(replaced);
    };
  }
});
var require_replaceRecursive = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/replaceRecursive.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function replaceRecursive(items) {
      var replace = function replace2(target, source) {
        var replaced = _objectSpread({}, target);
        var mergedKeys = Object.keys(_objectSpread(_objectSpread({}, target), source));
        mergedKeys.forEach(function(key) {
          if (!Array.isArray(source[key]) && _typeof(source[key]) === "object") {
            replaced[key] = replace2(target[key], source[key]);
          } else if (target[key] === void 0 && source[key] !== void 0) {
            if (_typeof(target[key]) === "object") {
              replaced[key] = _objectSpread({}, source[key]);
            } else {
              replaced[key] = source[key];
            }
          } else if (target[key] !== void 0 && source[key] === void 0) {
            if (_typeof(target[key]) === "object") {
              replaced[key] = _objectSpread({}, target[key]);
            } else {
              replaced[key] = target[key];
            }
          } else if (target[key] !== void 0 && source[key] !== void 0) {
            if (_typeof(source[key]) === "object") {
              replaced[key] = _objectSpread({}, source[key]);
            } else {
              replaced[key] = source[key];
            }
          }
        });
        return replaced;
      };
      if (!items) {
        return this;
      }
      if (!Array.isArray(items) && _typeof(items) !== "object") {
        return new this.constructor(replace(this.items, [items]));
      }
      if (items.constructor.name === "Collection") {
        return new this.constructor(replace(this.items, items.all()));
      }
      return new this.constructor(replace(this.items, items));
    };
  }
});
var require_reverse = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reverse.js"(exports, module) {
    module.exports = function reverse() {
      var collection = [].concat(this.items).reverse();
      return new this.constructor(collection);
    };
  }
});
var require_search = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/search.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function search(valueOrFunction, strict) {
      var _this = this;
      var result;
      var find = function find2(item, key) {
        if (isFunction(valueOrFunction)) {
          return valueOrFunction(_this.items[key], key);
        }
        if (strict) {
          return _this.items[key] === valueOrFunction;
        }
        return _this.items[key] == valueOrFunction;
      };
      if (isArray(this.items)) {
        result = this.items.findIndex(find);
      } else if (isObject(this.items)) {
        result = Object.keys(this.items).find(function(key) {
          return find(_this.items[key], key);
        });
      }
      if (result === void 0 || result < 0) {
        return false;
      }
      return result;
    };
  }
});
var require_shift = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/shift.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var deleteKeys = require_deleteKeys();
    module.exports = function shift() {
      var _this = this;
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      if (this.isEmpty()) {
        return null;
      }
      if (isArray(this.items)) {
        if (count === 1) {
          return this.items.shift();
        }
        return new this.constructor(this.items.splice(0, count));
      }
      if (isObject(this.items)) {
        if (count === 1) {
          var key = Object.keys(this.items)[0];
          var value = this.items[key];
          delete this.items[key];
          return value;
        }
        var keys = Object.keys(this.items);
        var poppedKeys = keys.slice(0, count);
        var newObject = poppedKeys.reduce(function(acc, current) {
          acc[current] = _this.items[current];
          return acc;
        }, {});
        deleteKeys(this.items, poppedKeys);
        return new this.constructor(newObject);
      }
      return null;
    };
  }
});
var require_shuffle = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/shuffle.js"(exports, module) {
    var values = require_values();
    module.exports = function shuffle() {
      var items = values(this.items);
      var j;
      var x;
      var i;
      for (i = items.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = items[i - 1];
        items[i - 1] = items[j];
        items[j] = x;
      }
      this.items = items;
      return this;
    };
  }
});
var require_skip = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skip.js"(exports, module) {
    var _require = require_is();
    var isObject = _require.isObject;
    module.exports = function skip(number) {
      var _this = this;
      if (isObject(this.items)) {
        return new this.constructor(Object.keys(this.items).reduce(function(accumulator, key, index) {
          if (index + 1 > number) {
            accumulator[key] = _this.items[key];
          }
          return accumulator;
        }, {}));
      }
      return new this.constructor(this.items.slice(number));
    };
  }
});
var require_skipUntil = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skipUntil.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function skipUntil(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== true) {
            previous = callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== true) {
            previous = callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_skipWhile = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skipWhile.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function skipWhile(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== true) {
            previous = !callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== true) {
            previous = !callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_slice = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/slice.js"(exports, module) {
    module.exports = function slice(remove, limit) {
      var collection = this.items.slice(remove);
      if (limit !== void 0) {
        collection = collection.slice(0, limit);
      }
      return new this.constructor(collection);
    };
  }
});
var require_sole = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sole.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function sole(key, operator, value) {
      var collection;
      if (isFunction(key)) {
        collection = this.filter(key);
      } else {
        collection = this.where(key, operator, value);
      }
      if (collection.isEmpty()) {
        throw new Error("Item not found.");
      }
      if (collection.count() > 1) {
        throw new Error("Multiple items found.");
      }
      return collection.first();
    };
  }
});
var require_some = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/some.js"(exports, module) {
    var contains = require_contains();
    module.exports = contains;
  }
});
var require_sort = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sort.js"(exports, module) {
    module.exports = function sort(fn) {
      var collection = [].concat(this.items);
      if (fn === void 0) {
        if (this.every(function(item) {
          return typeof item === "number";
        })) {
          collection.sort(function(a, b) {
            return a - b;
          });
        } else {
          collection.sort();
        }
      } else {
        collection.sort(fn);
      }
      return new this.constructor(collection);
    };
  }
});
var require_sortDesc = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortDesc.js"(exports, module) {
    module.exports = function sortDesc() {
      return this.sort().reverse();
    };
  }
});
var require_sortBy = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortBy.js"(exports, module) {
    var nestedValue = require_nestedValue();
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function sortBy(valueOrFunction) {
      var collection = [].concat(this.items);
      var getValue = function getValue2(item) {
        if (isFunction(valueOrFunction)) {
          return valueOrFunction(item);
        }
        return nestedValue(item, valueOrFunction);
      };
      collection.sort(function(a, b) {
        var valueA = getValue(a);
        var valueB = getValue(b);
        if (valueA === null || valueA === void 0) {
          return 1;
        }
        if (valueB === null || valueB === void 0) {
          return -1;
        }
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
      return new this.constructor(collection);
    };
  }
});
var require_sortByDesc = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortByDesc.js"(exports, module) {
    module.exports = function sortByDesc(valueOrFunction) {
      return this.sortBy(valueOrFunction).reverse();
    };
  }
});
var require_sortKeys = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortKeys.js"(exports, module) {
    module.exports = function sortKeys() {
      var _this = this;
      var ordered = {};
      Object.keys(this.items).sort().forEach(function(key) {
        ordered[key] = _this.items[key];
      });
      return new this.constructor(ordered);
    };
  }
});
var require_sortKeysDesc = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortKeysDesc.js"(exports, module) {
    module.exports = function sortKeysDesc() {
      var _this = this;
      var ordered = {};
      Object.keys(this.items).sort().reverse().forEach(function(key) {
        ordered[key] = _this.items[key];
      });
      return new this.constructor(ordered);
    };
  }
});
var require_splice = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/splice.js"(exports, module) {
    module.exports = function splice(index, limit, replace) {
      var slicedCollection = this.slice(index, limit);
      this.items = this.diff(slicedCollection.all()).all();
      if (Array.isArray(replace)) {
        for (var iterator = 0, length = replace.length; iterator < length; iterator += 1) {
          this.items.splice(index + iterator, 0, replace[iterator]);
        }
      }
      return slicedCollection;
    };
  }
});
var require_split = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/split.js"(exports, module) {
    module.exports = function split(numberOfGroups) {
      var itemsPerGroup = Math.round(this.items.length / numberOfGroups);
      var items = JSON.parse(JSON.stringify(this.items));
      var collection = [];
      for (var iterator = 0; iterator < numberOfGroups; iterator += 1) {
        collection.push(new this.constructor(items.splice(0, itemsPerGroup)));
      }
      return new this.constructor(collection);
    };
  }
});
var require_sum = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sum.js"(exports, module) {
    var values = require_values();
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function sum(key) {
      var items = values(this.items);
      var total = 0;
      if (key === void 0) {
        for (var i = 0, length = items.length; i < length; i += 1) {
          total += parseFloat(items[i]);
        }
      } else if (isFunction(key)) {
        for (var _i = 0, _length = items.length; _i < _length; _i += 1) {
          total += parseFloat(key(items[_i]));
        }
      } else {
        for (var _i2 = 0, _length2 = items.length; _i2 < _length2; _i2 += 1) {
          total += parseFloat(items[_i2][key]);
        }
      }
      return parseFloat(total.toPrecision(12));
    };
  }
});
var require_take = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/take.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function take(length) {
      var _this = this;
      if (!Array.isArray(this.items) && _typeof(this.items) === "object") {
        var keys = Object.keys(this.items);
        var slicedKeys;
        if (length < 0) {
          slicedKeys = keys.slice(length);
        } else {
          slicedKeys = keys.slice(0, length);
        }
        var collection = {};
        keys.forEach(function(prop) {
          if (slicedKeys.indexOf(prop) !== -1) {
            collection[prop] = _this.items[prop];
          }
        });
        return new this.constructor(collection);
      }
      if (length < 0) {
        return new this.constructor(this.items.slice(length));
      }
      return new this.constructor(this.items.slice(0, length));
    };
  }
});
var require_takeUntil = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/takeUntil.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function takeUntil(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== false) {
            previous = !callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== false) {
            previous = !callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_takeWhile = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/takeWhile.js"(exports, module) {
    var _require = require_is();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function takeWhile(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== false) {
            previous = callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== false) {
            previous = callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_tap = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/tap.js"(exports, module) {
    module.exports = function tap(fn) {
      fn(this);
      return this;
    };
  }
});
var require_times = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/times.js"(exports, module) {
    module.exports = function times(n, fn) {
      for (var iterator = 1; iterator <= n; iterator += 1) {
        this.items.push(fn(iterator));
      }
      return this;
    };
  }
});
var require_toArray = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/toArray.js"(exports, module) {
    module.exports = function toArray() {
      var collectionInstance = this.constructor;
      function iterate(list, collection2) {
        var childCollection = [];
        if (list instanceof collectionInstance) {
          list.items.forEach(function(i) {
            return iterate(i, childCollection);
          });
          collection2.push(childCollection);
        } else if (Array.isArray(list)) {
          list.forEach(function(i) {
            return iterate(i, childCollection);
          });
          collection2.push(childCollection);
        } else {
          collection2.push(list);
        }
      }
      if (Array.isArray(this.items)) {
        var collection = [];
        this.items.forEach(function(items) {
          iterate(items, collection);
        });
        return collection;
      }
      return this.values().all();
    };
  }
});
var require_toJson = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/toJson.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function toJson() {
      if (_typeof(this.items) === "object" && !Array.isArray(this.items)) {
        return JSON.stringify(this.all());
      }
      return JSON.stringify(this.toArray());
    };
  }
});
var require_transform = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/transform.js"(exports, module) {
    module.exports = function transform(fn) {
      var _this = this;
      if (Array.isArray(this.items)) {
        this.items = this.items.map(fn);
      } else {
        var collection = {};
        Object.keys(this.items).forEach(function(key) {
          collection[key] = fn(_this.items[key], key);
        });
        this.items = collection;
      }
      return this;
    };
  }
});
var require_undot = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/undot.js"(exports, module) {
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function undot() {
      var _this = this;
      if (Array.isArray(this.items)) {
        return this;
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (key.indexOf(".") !== -1) {
          var obj = collection;
          key.split(".").reduce(function(acc, current, index, array) {
            if (!acc[current]) {
              acc[current] = {};
            }
            if (index === array.length - 1) {
              acc[current] = _this.items[key];
            }
            return acc[current];
          }, obj);
          collection = _objectSpread(_objectSpread({}, collection), obj);
        } else {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_unless = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unless.js"(exports, module) {
    module.exports = function when(value, fn, defaultFn) {
      if (!value) {
        fn(this);
      } else {
        defaultFn(this);
      }
    };
  }
});
var require_whenNotEmpty = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whenNotEmpty.js"(exports, module) {
    module.exports = function whenNotEmpty(fn, defaultFn) {
      if (Array.isArray(this.items) && this.items.length) {
        return fn(this);
      }
      if (Object.keys(this.items).length) {
        return fn(this);
      }
      if (defaultFn !== void 0) {
        if (Array.isArray(this.items) && !this.items.length) {
          return defaultFn(this);
        }
        if (!Object.keys(this.items).length) {
          return defaultFn(this);
        }
      }
      return this;
    };
  }
});
var require_whenEmpty = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whenEmpty.js"(exports, module) {
    module.exports = function whenEmpty(fn, defaultFn) {
      if (Array.isArray(this.items) && !this.items.length) {
        return fn(this);
      }
      if (!Object.keys(this.items).length) {
        return fn(this);
      }
      if (defaultFn !== void 0) {
        if (Array.isArray(this.items) && this.items.length) {
          return defaultFn(this);
        }
        if (Object.keys(this.items).length) {
          return defaultFn(this);
        }
      }
      return this;
    };
  }
});
var require_union = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/union.js"(exports, module) {
    module.exports = function union(object) {
      var _this = this;
      var collection = JSON.parse(JSON.stringify(this.items));
      Object.keys(object).forEach(function(prop) {
        if (_this.items[prop] === void 0) {
          collection[prop] = object[prop];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_unique = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unique.js"(exports, module) {
    var _require = require_is();
    var isFunction = _require.isFunction;
    module.exports = function unique(key) {
      var collection;
      if (key === void 0) {
        collection = this.items.filter(function(element, index, self2) {
          return self2.indexOf(element) === index;
        });
      } else {
        collection = [];
        var usedKeys = [];
        for (var iterator = 0, length = this.items.length; iterator < length; iterator += 1) {
          var uniqueKey = void 0;
          if (isFunction(key)) {
            uniqueKey = key(this.items[iterator]);
          } else {
            uniqueKey = this.items[iterator][key];
          }
          if (usedKeys.indexOf(uniqueKey) === -1) {
            collection.push(this.items[iterator]);
            usedKeys.push(uniqueKey);
          }
        }
      }
      return new this.constructor(collection);
    };
  }
});
var require_unwrap = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unwrap.js"(exports, module) {
    module.exports = function unwrap(value) {
      if (value instanceof this.constructor) {
        return value.all();
      }
      return value;
    };
  }
});
var require_values2 = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/values.js"(exports, module) {
    var getValues = require_values();
    module.exports = function values() {
      return new this.constructor(getValues(this.items));
    };
  }
});
var require_when = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/when.js"(exports, module) {
    module.exports = function when(value, fn, defaultFn) {
      if (value) {
        return fn(this, value);
      }
      if (defaultFn) {
        return defaultFn(this, value);
      }
      return this;
    };
  }
});
var require_where = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/where.js"(exports, module) {
    var values = require_values();
    var nestedValue = require_nestedValue();
    module.exports = function where(key, operator, value) {
      var comparisonOperator = operator;
      var comparisonValue = value;
      var items = values(this.items);
      if (operator === void 0 || operator === true) {
        return new this.constructor(items.filter(function(item) {
          return nestedValue(item, key);
        }));
      }
      if (operator === false) {
        return new this.constructor(items.filter(function(item) {
          return !nestedValue(item, key);
        }));
      }
      if (value === void 0) {
        comparisonValue = operator;
        comparisonOperator = "===";
      }
      var collection = items.filter(function(item) {
        switch (comparisonOperator) {
          case "==":
            return nestedValue(item, key) === Number(comparisonValue) || nestedValue(item, key) === comparisonValue.toString();
          default:
          case "===":
            return nestedValue(item, key) === comparisonValue;
          case "!=":
          case "<>":
            return nestedValue(item, key) !== Number(comparisonValue) && nestedValue(item, key) !== comparisonValue.toString();
          case "!==":
            return nestedValue(item, key) !== comparisonValue;
          case "<":
            return nestedValue(item, key) < comparisonValue;
          case "<=":
            return nestedValue(item, key) <= comparisonValue;
          case ">":
            return nestedValue(item, key) > comparisonValue;
          case ">=":
            return nestedValue(item, key) >= comparisonValue;
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereBetween = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereBetween.js"(exports, module) {
    module.exports = function whereBetween(key, values) {
      return this.where(key, ">=", values[0]).where(key, "<=", values[values.length - 1]);
    };
  }
});
var require_whereIn = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereIn.js"(exports, module) {
    var extractValues = require_values();
    var nestedValue = require_nestedValue();
    module.exports = function whereIn(key, values) {
      var items = extractValues(values);
      var collection = this.items.filter(function(item) {
        return items.indexOf(nestedValue(item, key)) !== -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereInstanceOf = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereInstanceOf.js"(exports, module) {
    module.exports = function whereInstanceOf(type) {
      return this.filter(function(item) {
        return item instanceof type;
      });
    };
  }
});
var require_whereNotBetween = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotBetween.js"(exports, module) {
    var nestedValue = require_nestedValue();
    module.exports = function whereNotBetween(key, values) {
      return this.filter(function(item) {
        return nestedValue(item, key) < values[0] || nestedValue(item, key) > values[values.length - 1];
      });
    };
  }
});
var require_whereNotIn = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotIn.js"(exports, module) {
    var extractValues = require_values();
    var nestedValue = require_nestedValue();
    module.exports = function whereNotIn(key, values) {
      var items = extractValues(values);
      var collection = this.items.filter(function(item) {
        return items.indexOf(nestedValue(item, key)) === -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereNull = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNull.js"(exports, module) {
    module.exports = function whereNull() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return this.where(key, "===", null);
    };
  }
});
var require_whereNotNull = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotNull.js"(exports, module) {
    module.exports = function whereNotNull() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return this.where(key, "!==", null);
    };
  }
});
var require_wrap = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/wrap.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function wrap(value) {
      if (value instanceof this.constructor) {
        return value;
      }
      if (_typeof(value) === "object") {
        return new this.constructor(value);
      }
      return new this.constructor([value]);
    };
  }
});
var require_zip = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/zip.js"(exports, module) {
    module.exports = function zip(array) {
      var _this = this;
      var values = array;
      if (values instanceof this.constructor) {
        values = values.all();
      }
      var collection = this.items.map(function(item, index) {
        return new _this.constructor([item, values[index]]);
      });
      return new this.constructor(collection);
    };
  }
});
var require_dist = __commonJS2({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/index.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function Collection(collection) {
      if (collection !== void 0 && !Array.isArray(collection) && _typeof(collection) !== "object") {
        this.items = [collection];
      } else if (collection instanceof this.constructor) {
        this.items = collection.all();
      } else {
        this.items = collection || [];
      }
    }
    var SymbolIterator = require_symbol_iterator();
    if (typeof Symbol !== "undefined") {
      Collection.prototype[Symbol.iterator] = SymbolIterator;
    }
    Collection.prototype.toJSON = function toJSON() {
      return this.items;
    };
    Collection.prototype.all = require_all();
    Collection.prototype.average = require_average();
    Collection.prototype.avg = require_avg();
    Collection.prototype.chunk = require_chunk();
    Collection.prototype.collapse = require_collapse();
    Collection.prototype.combine = require_combine();
    Collection.prototype.concat = require_concat();
    Collection.prototype.contains = require_contains();
    Collection.prototype.containsOneItem = require_containsOneItem();
    Collection.prototype.count = require_count();
    Collection.prototype.countBy = require_countBy();
    Collection.prototype.crossJoin = require_crossJoin();
    Collection.prototype.dd = require_dd();
    Collection.prototype.diff = require_diff();
    Collection.prototype.diffAssoc = require_diffAssoc();
    Collection.prototype.diffKeys = require_diffKeys();
    Collection.prototype.diffUsing = require_diffUsing();
    Collection.prototype.doesntContain = require_doesntContain();
    Collection.prototype.dump = require_dump();
    Collection.prototype.duplicates = require_duplicates();
    Collection.prototype.each = require_each();
    Collection.prototype.eachSpread = require_eachSpread();
    Collection.prototype.every = require_every();
    Collection.prototype.except = require_except();
    Collection.prototype.filter = require_filter();
    Collection.prototype.first = require_first();
    Collection.prototype.firstOrFail = require_firstOrFail();
    Collection.prototype.firstWhere = require_firstWhere();
    Collection.prototype.flatMap = require_flatMap();
    Collection.prototype.flatten = require_flatten();
    Collection.prototype.flip = require_flip();
    Collection.prototype.forPage = require_forPage();
    Collection.prototype.forget = require_forget();
    Collection.prototype.get = require_get();
    Collection.prototype.groupBy = require_groupBy();
    Collection.prototype.has = require_has();
    Collection.prototype.implode = require_implode();
    Collection.prototype.intersect = require_intersect();
    Collection.prototype.intersectByKeys = require_intersectByKeys();
    Collection.prototype.isEmpty = require_isEmpty();
    Collection.prototype.isNotEmpty = require_isNotEmpty();
    Collection.prototype.join = require_join();
    Collection.prototype.keyBy = require_keyBy();
    Collection.prototype.keys = require_keys();
    Collection.prototype.last = require_last();
    Collection.prototype.macro = require_macro();
    Collection.prototype.make = require_make();
    Collection.prototype.map = require_map();
    Collection.prototype.mapSpread = require_mapSpread();
    Collection.prototype.mapToDictionary = require_mapToDictionary();
    Collection.prototype.mapInto = require_mapInto();
    Collection.prototype.mapToGroups = require_mapToGroups();
    Collection.prototype.mapWithKeys = require_mapWithKeys();
    Collection.prototype.max = require_max();
    Collection.prototype.median = require_median();
    Collection.prototype.merge = require_merge();
    Collection.prototype.mergeRecursive = require_mergeRecursive();
    Collection.prototype.min = require_min();
    Collection.prototype.mode = require_mode();
    Collection.prototype.nth = require_nth();
    Collection.prototype.only = require_only();
    Collection.prototype.pad = require_pad();
    Collection.prototype.partition = require_partition();
    Collection.prototype.pipe = require_pipe();
    Collection.prototype.pluck = require_pluck();
    Collection.prototype.pop = require_pop();
    Collection.prototype.prepend = require_prepend();
    Collection.prototype.pull = require_pull();
    Collection.prototype.push = require_push();
    Collection.prototype.put = require_put();
    Collection.prototype.random = require_random();
    Collection.prototype.reduce = require_reduce();
    Collection.prototype.reject = require_reject();
    Collection.prototype.replace = require_replace();
    Collection.prototype.replaceRecursive = require_replaceRecursive();
    Collection.prototype.reverse = require_reverse();
    Collection.prototype.search = require_search();
    Collection.prototype.shift = require_shift();
    Collection.prototype.shuffle = require_shuffle();
    Collection.prototype.skip = require_skip();
    Collection.prototype.skipUntil = require_skipUntil();
    Collection.prototype.skipWhile = require_skipWhile();
    Collection.prototype.slice = require_slice();
    Collection.prototype.sole = require_sole();
    Collection.prototype.some = require_some();
    Collection.prototype.sort = require_sort();
    Collection.prototype.sortDesc = require_sortDesc();
    Collection.prototype.sortBy = require_sortBy();
    Collection.prototype.sortByDesc = require_sortByDesc();
    Collection.prototype.sortKeys = require_sortKeys();
    Collection.prototype.sortKeysDesc = require_sortKeysDesc();
    Collection.prototype.splice = require_splice();
    Collection.prototype.split = require_split();
    Collection.prototype.sum = require_sum();
    Collection.prototype.take = require_take();
    Collection.prototype.takeUntil = require_takeUntil();
    Collection.prototype.takeWhile = require_takeWhile();
    Collection.prototype.tap = require_tap();
    Collection.prototype.times = require_times();
    Collection.prototype.toArray = require_toArray();
    Collection.prototype.toJson = require_toJson();
    Collection.prototype.transform = require_transform();
    Collection.prototype.undot = require_undot();
    Collection.prototype.unless = require_unless();
    Collection.prototype.unlessEmpty = require_whenNotEmpty();
    Collection.prototype.unlessNotEmpty = require_whenEmpty();
    Collection.prototype.union = require_union();
    Collection.prototype.unique = require_unique();
    Collection.prototype.unwrap = require_unwrap();
    Collection.prototype.values = require_values2();
    Collection.prototype.when = require_when();
    Collection.prototype.whenEmpty = require_whenEmpty();
    Collection.prototype.whenNotEmpty = require_whenNotEmpty();
    Collection.prototype.where = require_where();
    Collection.prototype.whereBetween = require_whereBetween();
    Collection.prototype.whereIn = require_whereIn();
    Collection.prototype.whereInstanceOf = require_whereInstanceOf();
    Collection.prototype.whereNotBetween = require_whereNotBetween();
    Collection.prototype.whereNotIn = require_whereNotIn();
    Collection.prototype.whereNull = require_whereNull();
    Collection.prototype.whereNotNull = require_whereNotNull();
    Collection.prototype.wrap = require_wrap();
    Collection.prototype.zip = require_zip();
    var collect = function collect2(collection) {
      return new Collection(collection);
    };
    module.exports = collect;
    module.exports.collect = collect;
    module.exports["default"] = collect;
    module.exports.Collection = Collection;
  }
});
var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
var __decorateClass22 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc22(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var DISCOVERABLE_DECORATOR_KEY_PREFIX2 = "@discoverable:";
var MODULE_METADATA2 = {
  IMPORTS: "imports",
  PROVIDERS: "providers",
  CONTROLLERS: "controllers",
  EXPORTS: "exports"
};
var GLOBAL_MODULE_METADATA2 = "__module:global__";
var PARAMTYPES_METADATA2 = "design:paramtypes";
var SELF_DECLARED_DEPS_METADATA2 = "self:paramtypes";
var PROPERTY_DEPS_METADATA2 = "self:properties_metadata";
var SCOPE_OPTIONS_METADATA2 = "scope:options";
var INJECTABLE_WATERMARK2 = "__injectable__";
function Injectable2(options) {
  return (target) => {
    defineMetadata(INJECTABLE_WATERMARK2, true, target);
    defineMetadata(SCOPE_OPTIONS_METADATA2, options, target);
  };
}
var DiscoverableMetaHostCollection2 = class {
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
var resolvedInstances2 = /* @__PURE__ */ new Map();
function getTokenKey2(token) {
  if (typeof token === "function") return token.name;
  if (typeof token === "symbol") return token.toString();
  return String(token);
}
function inject2(token) {
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
inject2.swap = function swap2(token, instance) {
  const key = getTokenKey2(token);
  resolvedInstances2.set(key, instance);
};
inject2.clear = function clear2(token) {
  const key = getTokenKey2(token);
  resolvedInstances2.delete(key);
};
inject2.clearAll = function clearAll2() {
  resolvedInstances2.clear();
};
function generateMetadataKey2() {
  const cryptoRef = globalThis.crypto;
  const uuid = cryptoRef?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;
  return `${DISCOVERABLE_DECORATOR_KEY_PREFIX2}${uuid}`;
}
var DiscoveryService2 = class {
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
    const metadataKey = generateMetadataKey2();
    const decorator = ((opts) => {
      const value = opts ?? {};
      return ((target, propertyKey, descriptor) => {
        if (descriptor && propertyKey !== void 0) {
          defineMetadata(metadataKey, value, descriptor.value);
          return descriptor;
        }
        DiscoverableMetaHostCollection2.addClassMetaHostLink(target, metadataKey);
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
      const wrappers = DiscoverableMetaHostCollection2.getProvidersByMetaKey(
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
DiscoveryService2 = __decorateClass22([
  Injectable2()
], DiscoveryService2);
__toESM2(require_Reflect2());
function Inject2(token) {
  const hasExplicitToken = arguments.length > 0;
  return (target, key, index) => {
    let resolvedToken = token;
    if (!resolvedToken && !hasExplicitToken) {
      if (key !== void 0) {
        resolvedToken = getMetadata("design:type", target, key);
      } else if (index !== void 0) {
        const paramTypes = getMetadata(PARAMTYPES_METADATA2, target) ?? [];
        resolvedToken = paramTypes[index];
      }
    }
    if (resolvedToken && typeof resolvedToken === "object" && "forwardRef" in resolvedToken) {
      const thunk = resolvedToken.forwardRef;
      resolvedToken = typeof thunk === "function" ? thunk() : thunk;
    }
    if (index !== void 0) {
      updateMetadata(
        SELF_DECLARED_DEPS_METADATA2,
        [],
        (deps) => [...deps, { index, param: resolvedToken }],
        target
      );
    } else {
      updateMetadata(
        PROPERTY_DEPS_METADATA2,
        [],
        (props) => [
          ...props,
          { key, type: resolvedToken }
        ],
        target.constructor
      );
    }
  };
}
var PROPERTY_TO_METADATA_KEY2 = {
  imports: MODULE_METADATA2.IMPORTS,
  controllers: MODULE_METADATA2.CONTROLLERS,
  providers: MODULE_METADATA2.PROVIDERS,
  exports: MODULE_METADATA2.EXPORTS
};
var VALID_MODULE_KEYS2 = new Set(Object.keys(PROPERTY_TO_METADATA_KEY2));
function Module2(metadata) {
  const invalidKeys = Object.keys(metadata).filter((key) => !VALID_MODULE_KEYS2.has(key));
  if (invalidKeys.length > 0) {
    throw new Error(
      `Invalid property '${invalidKeys.join("', '")}' passed into the @Module() decorator. Valid properties are: ${[...VALID_MODULE_KEYS2].join(", ")}.`
    );
  }
  return (target) => {
    for (const property in metadata) {
      if (!Object.prototype.hasOwnProperty.call(metadata, property)) continue;
      const metadataKey = PROPERTY_TO_METADATA_KEY2[property];
      defineMetadata(metadataKey, metadata[property], target);
    }
  };
}
function Global2() {
  return (target) => {
    defineMetadata(GLOBAL_MODULE_METADATA2, true, target);
  };
}
var Reflector2 = class {
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
Reflector2 = __decorateClass22([
  Injectable2()
], Reflector2);
var DiscoveryModule2 = class {
};
DiscoveryModule2 = __decorateClass22([
  Global2(),
  Module2({
    providers: [DiscoveryService2],
    exports: [DiscoveryService2]
  })
], DiscoveryModule2);
var LOGGER_CONFIG = /* @__PURE__ */ Symbol.for("LOGGER_CONFIG");
var LOGGER_MANAGER = /* @__PURE__ */ Symbol.for("LOGGER_MANAGER");
var LogLevel = /* @__PURE__ */ ((LogLevel22) => {
  LogLevel22[LogLevel22["Debug"] = 0] = "Debug";
  LogLevel22[LogLevel22["Info"] = 1] = "Info";
  LogLevel22[LogLevel22["Warn"] = 2] = "Warn";
  LogLevel22[LogLevel22["Error"] = 3] = "Error";
  LogLevel22[LogLevel22["Fatal"] = 4] = "Fatal";
  return LogLevel22;
})(LogLevel || {});
__toESM2(require_dist());
var Str = class _Str {
  /**
   * Return the remainder of a string after the first occurrence of a given value.
   *
   * @param subject - The string to search in
   * @param search  - The value to search for
   * @returns The portion of the string after the first occurrence of search
   *
   * @example
   * ```typescript
   * Str.after('hello world', 'hello '); // 'world'
   * Str.after('a.b.c', '.');            // 'b.c'
   * ```
   */
  static after(subject, search) {
    if (search === "") return subject;
    const index = subject.indexOf(search);
    return index === -1 ? subject : subject.substring(index + search.length);
  }
  /**
   * Return the remainder of a string after the last occurrence of a given value
   */
  static afterLast(subject, search) {
    if (search === "") return subject;
    const index = subject.lastIndexOf(search);
    return index === -1 ? subject : subject.substring(index + search.length);
  }
  /**
   * Convert a string to title case following APA guidelines
   */
  static apa(value) {
    const minorWords = [
      "a",
      "an",
      "and",
      "as",
      "at",
      "but",
      "by",
      "for",
      "in",
      "of",
      "on",
      "or",
      "the",
      "to",
      "up"
    ];
    const words = value.split(" ");
    return words.map((word, index) => {
      if (index === 0 || !minorWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    }).join(" ");
  }
  /**
   * Transliterate a UTF-8 value to ASCII
   */
  static ascii(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  /**
   * Get the portion of a string before the first occurrence of a given value
   */
  static before(subject, search) {
    if (search === "") return subject;
    const index = subject.indexOf(search);
    return index === -1 ? subject : subject.substring(0, index);
  }
  /**
   * Get the portion of a string before the last occurrence of a given value
   */
  static beforeLast(subject, search) {
    if (search === "") return subject;
    const index = subject.lastIndexOf(search);
    return index === -1 ? subject : subject.substring(0, index);
  }
  /**
   * Get the portion of a string between two values
   */
  static between(subject, from, to) {
    if (from === "" || to === "") return subject;
    const startIndex = subject.indexOf(from);
    if (startIndex === -1) return "";
    const start = startIndex + from.length;
    const endIndex = subject.indexOf(to, start);
    return endIndex === -1 ? "" : subject.substring(start, endIndex);
  }
  /**
   * Get the smallest possible portion of a string between two values
   */
  static betweenFirst(subject, from, to) {
    return _Str.between(subject, from, to);
  }
  /**
   * Convert a string to camelCase.
   *
   * Handles word boundaries from separators (`-`, `_`, space) and from
   * consecutive uppercase runs (e.g. `XML_HTTP_REQUEST` → `xmlHttpRequest`).
   *
   * @param value - The input string
   * @returns The camelCase string
   *
   * @example
   * ```typescript
   * Str.camel('foo_bar');           // 'fooBar'
   * Str.camel('foo-bar baz');        // 'fooBarBaz'
   * Str.camel('XML_HTTP_REQUEST');  // 'xmlHttpRequest'
   * ```
   */
  static camel(value) {
    return _Str.studly(value).replace(/^(.)/, (char) => char.toLowerCase());
  }
  /**
   * Get the character at the specified index
   */
  static charAt(subject, index) {
    if (index < 0 || index >= subject.length) return false;
    return subject.charAt(index);
  }
  /**
   * Remove the first occurrence of the given value from the start of the string
   */
  static chopStart(subject, search) {
    const searches = Array.isArray(search) ? search : [search];
    for (const s of searches) {
      if (subject.startsWith(s)) {
        return subject.substring(s.length);
      }
    }
    return subject;
  }
  /**
   * Remove the last occurrence of the given value from the end of the string
   */
  static chopEnd(subject, search) {
    const searches = Array.isArray(search) ? search : [search];
    for (const s of searches) {
      if (subject.endsWith(s)) {
        return subject.substring(0, subject.length - s.length);
      }
    }
    return subject;
  }
  /**
   * Determine if a given string contains a given substring
   */
  static contains(haystack, needles, ignoreCase = false) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    const subject = ignoreCase ? haystack.toLowerCase() : haystack;
    return needleArray.some((needle) => {
      const search = ignoreCase ? needle.toLowerCase() : needle;
      return subject.includes(search);
    });
  }
  /**
   * Determine if a given string contains all array values
   */
  static containsAll(haystack, needles, ignoreCase = false) {
    const subject = ignoreCase ? haystack.toLowerCase() : haystack;
    return needles.every((needle) => {
      const search = ignoreCase ? needle.toLowerCase() : needle;
      return subject.includes(search);
    });
  }
  /**
   * Determine if a given string doesn't contain a given substring
   */
  static doesntContain(haystack, needles, ignoreCase = false) {
    return !_Str.contains(haystack, needles, ignoreCase);
  }
  /**
   * Replace consecutive instances of a character with a single instance
   */
  static deduplicate(value, character = " ") {
    const escaped = character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`${escaped}+`, "g");
    return value.replace(regex, character);
  }
  /**
   * Determine if a given string ends with a given substring
   */
  static endsWith(haystack, needles) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    return needleArray.some((needle) => haystack.endsWith(needle));
  }
  /**
   * Extract an excerpt from text that matches the first instance of a phrase
   */
  static excerpt(text, phrase, options = {}) {
    const radius = options.radius ?? 100;
    const omission = options.omission ?? "...";
    const index = text.indexOf(phrase);
    if (index === -1) return "";
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + phrase.length + radius);
    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = omission + excerpt;
    if (end < text.length) excerpt = excerpt + omission;
    return excerpt;
  }
  /**
   * Cap a string with a single instance of a given value
   */
  static finish(value, cap) {
    return value.endsWith(cap) ? value : value + cap;
  }
  /**
   * Convert a string to headline case
   */
  static headline(value) {
    return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  }
  /**
   * Determine if a given string matches a given pattern
   */
  static is(pattern, value, ignoreCase = false) {
    const regexPattern = pattern.replace(/\*/g, ".*");
    const flags = ignoreCase ? "i" : "";
    const regex = new RegExp(`^${regexPattern}$`, flags);
    return regex.test(value);
  }
  /**
   * Determine if a given string is 7-bit ASCII
   */
  static isAscii(value) {
    return /^[\x00-\x7F]*$/.test(value);
  }
  /**
   * Determine if a given string is valid JSON
   */
  static isJson(value) {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Determine if a given string is a valid URL
   */
  static isUrl(value, protocols) {
    try {
      if (typeof URL === "undefined") {
        const urlPattern = /^https?:\/\/.+/i;
        return urlPattern.test(value);
      }
      const urlObj = new URL(value);
      if (protocols) {
        return protocols.includes(urlObj.protocol.replace(":", ""));
      }
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Determine if a given string is a valid ULID
   */
  static isUlid(value) {
    return /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(value);
  }
  /**
   * Determine if a given string is a valid UUID
   */
  static isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }
  /**
   * Convert a string to kebab-case
   */
  static kebab(value) {
    return value.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
  }
  /**
   * Return the given string with the first character lowercased
   */
  static lcfirst(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
  /**
   * Return the length of the given string
   */
  static len(value) {
    return value.length;
  }
  /**
   * Limit the number of characters in a string
   */
  static limit(value, limit = 100, end = "...", preserveWords = false) {
    if (value.length <= limit) return value;
    let truncated = value.substring(0, limit);
    if (preserveWords) {
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace > 0) {
        truncated = truncated.substring(0, lastSpace);
      }
    }
    return truncated + end;
  }
  /**
   * Convert the given string to lowercase
   */
  static lower(value) {
    return value.toLowerCase();
  }
  /**
   * Masks a portion of a string with a repeated character
   */
  static mask(value, character, index, length) {
    if (index < 0) {
      index = value.length + index;
    }
    const maskLength = length ?? value.length - index;
    const mask = character.repeat(Math.abs(maskLength));
    return value.substring(0, index) + mask + value.substring(index + Math.abs(maskLength));
  }
  /**
   * Pad both sides of a string with another
   */
  static padBoth(value, length, pad = " ") {
    const totalPadding = length - value.length;
    if (totalPadding <= 0) return value;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;
    return pad.repeat(leftPadding) + value + pad.repeat(rightPadding);
  }
  /**
   * Pad the left side of a string with another
   */
  static padLeft(value, length, pad = " ") {
    return value.padStart(length, pad);
  }
  /**
   * Pad the right side of a string with another
   */
  static padRight(value, length, pad = " ") {
    return value.padEnd(length, pad);
  }
  /**
   * Get the plural form of an English word
   */
  static plural(value, count = 2) {
    if (count === 1) return value;
    if (value.endsWith("y") && !/[aeiou]y$/i.test(value)) {
      return value.slice(0, -1) + "ies";
    }
    if (value.endsWith("s") || value.endsWith("x") || value.endsWith("z") || value.endsWith("ch") || value.endsWith("sh")) {
      return value + "es";
    }
    return value + "s";
  }
  /**
   * Pluralize the last word of an English, studly caps case string
   */
  static pluralStudly(value, count = 2) {
    const parts = value.match(/[A-Z][a-z]*/g) || [value];
    const lastWord = parts[parts.length - 1];
    const pluralized = _Str.plural(lastWord, count);
    parts[parts.length - 1] = pluralized;
    return parts.join("");
  }
  /**
   * Find the position of the first occurrence of a substring
   */
  static position(haystack, needle) {
    const pos = haystack.indexOf(needle);
    return pos === -1 ? false : pos;
  }
  /**
   * Generate a random string
   */
  static random(length = 16) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  /**
   * Remove the given value from the string
   */
  static remove(search, subject, caseSensitive = true) {
    const searches = Array.isArray(search) ? search : [search];
    let result = subject;
    searches.forEach((s) => {
      const flags = caseSensitive ? "g" : "gi";
      const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(escaped, flags), "");
    });
    return result;
  }
  /**
   * Repeat the given string
   */
  static repeat(value, times) {
    return value.repeat(times);
  }
  /**
   * Replace the given value in the given string
   */
  static replace(search, replace, subject, caseSensitive = true) {
    const flags = caseSensitive ? "g" : "gi";
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return subject.replace(new RegExp(escaped, flags), replace);
  }
  /**
   * Replace a given value in the string sequentially with an array
   */
  static replaceArray(search, replacements, subject) {
    let result = subject;
    let index = 0;
    while (result.includes(search) && index < replacements.length) {
      result = result.replace(search, replacements[index]);
      index++;
    }
    return result;
  }
  /**
   * Replace the first occurrence of a given value in the string
   */
  static replaceFirst(search, replace, subject) {
    return subject.replace(search, replace);
  }
  /**
   * Replace the last occurrence of a given value in the string
   */
  static replaceLast(search, replace, subject) {
    const index = subject.lastIndexOf(search);
    if (index === -1) return subject;
    return subject.substring(0, index) + replace + subject.substring(index + search.length);
  }
  /**
   * Replace the first occurrence only if it appears at the start
   */
  static replaceStart(search, replace, subject) {
    return subject.startsWith(search) ? replace + subject.substring(search.length) : subject;
  }
  /**
   * Replace the last occurrence only if it appears at the end
   */
  static replaceEnd(search, replace, subject) {
    return subject.endsWith(search) ? subject.substring(0, subject.length - search.length) + replace : subject;
  }
  /**
   * Reverse the given string
   */
  static reverse(value) {
    return value.split("").reverse().join("");
  }
  /**
   * Get the singular form of an English word
   */
  static singular(value) {
    if (value.endsWith("ies")) {
      return value.slice(0, -3) + "y";
    }
    if (value.endsWith("es")) {
      return value.slice(0, -2);
    }
    if (value.endsWith("s") && !value.endsWith("ss")) {
      return value.slice(0, -1);
    }
    return value;
  }
  /**
   * Generate a URL friendly slug
   */
  static slug(value, separator = "-") {
    return value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, separator).replace(new RegExp(`${separator}+`, "g"), separator).replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
  }
  /**
   * Convert a string to snake_case.
   *
   * Handles word boundaries from separators (`-`, `_`, space) and from
   * uppercase boundaries (camelCase or consecutive-uppercase runs).
   *
   * @param value     - The input string
   * @param delimiter - Word delimiter (default: `'_'`)
   * @returns The snake_case string
   *
   * @example
   * ```typescript
   * Str.snake('camelCase');     // 'camel_case'
   * Str.snake('HTMLParser');    // 'html_parser'
   * Str.snake('foo bar baz');    // 'foo_bar_baz'
   * ```
   */
  static snake(value, delimiter = "_") {
    return _Str.splitWords(value).map((word) => word.toLowerCase()).join(delimiter);
  }
  /**
   * Remove all extraneous whitespace
   */
  static squish(value) {
    return value.trim().replace(/\s+/g, " ");
  }
  /**
   * Begin a string with a single instance of a given value
   */
  static start(value, prefix) {
    return value.startsWith(prefix) ? value : prefix + value;
  }
  /**
   * Determine if a given string starts with a given substring
   */
  static startsWith(haystack, needles) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    return needleArray.some((needle) => haystack.startsWith(needle));
  }
  /**
   * Convert a value to StudlyCase (a.k.a. PascalCase).
   *
   * Splits the input into words on separators (`-`, `_`, space) and on
   * uppercase boundaries (camelCase or consecutive-uppercase runs), then
   * joins each word with its first letter capitalized and the rest
   * lowercased.
   *
   * @param value - The input string
   * @returns The StudlyCase string
   *
   * @example
   * ```typescript
   * Str.studly('hello_world');           // 'HelloWorld'
   * Str.studly('hello-world foo bar');    // 'HelloWorldFooBar'
   * Str.studly('XML_HTTP_REQUEST');      // 'XmlHttpRequest'
   * Str.studly('camelCase');              // 'CamelCase'
   * ```
   */
  static studly(value) {
    return _Str.splitWords(value).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
  }
  /**
   * Split a string into word tokens.
   *
   * Splits on `-`, `_`, whitespace, and on uppercase boundaries. Treats
   * consecutive uppercase letters followed by a lowercase letter as the
   * end of an uppercase run (so `XMLHttp` → `['XML', 'Http']`).
   *
   * @param value - The input string
   * @returns Array of word tokens (lowercased boundaries preserved)
   *
   * @internal Used by `camel`, `studly`, `kebab`, `snake`, etc.
   */
  static splitWords(value) {
    if (!value) return [];
    return value.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_\s]+/g, " ").trim().split(" ").filter(Boolean);
  }
  /**
   * Returns the portion of string specified by the start and length parameters
   */
  static substr(value, start, length) {
    return value.substr(start, length);
  }
  /**
   * Returns the number of substring occurrences
   */
  static substrCount(haystack, needle) {
    return (haystack.match(new RegExp(needle, "g")) || []).length;
  }
  /**
   * Replace text within a portion of a string
   */
  static substrReplace(value, replace, start, length) {
    const actualLength = length ?? value.length - start;
    return value.substring(0, start) + replace + value.substring(start + actualLength);
  }
  /**
   * Swap multiple keywords in a string with other keywords.
   *
   * Performs an atomic single-pass swap — replacements are applied
   * simultaneously so the output of one swap is never re-swapped.
   *
   * @param map     - Map of search → replace pairs
   * @param subject - The string to perform swaps on
   * @returns The string with all swaps applied
   *
   * @example
   * ```typescript
   * Str.swap({ foo: 'bar', bar: 'baz' }, 'foo bar');
   * // → 'bar baz' (not 'baz baz' — atomic, no re-swapping)
   * ```
   */
  static swap(map, subject) {
    const keys = Object.keys(map);
    if (keys.length === 0) return subject;
    const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
    const escaped = sortedKeys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(escaped.join("|"), "g");
    return subject.replace(pattern, (match) => map[match] ?? match);
  }
  /**
   * Take the first or last {limit} characters
   */
  static take(value, limit) {
    if (limit < 0) {
      return value.slice(limit);
    }
    return value.slice(0, limit);
  }
  /**
   * Convert the given string to title case
   */
  static title(value) {
    return value.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  /**
   * Convert the given string to Base64
   */
  static toBase64(value) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(value).toString("base64");
    }
    if (typeof btoa !== "undefined") {
      return btoa(value);
    }
    throw new Error("Base64 encoding not supported in this environment");
  }
  /**
   * Transliterate a string to its closest ASCII representation
   */
  static transliterate(value) {
    return _Str.ascii(value);
  }
  /**
   * Trim whitespace from both ends of the string
   */
  static trim(value, characters) {
    if (!characters) return value.trim();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`^[${escaped}]+|[${escaped}]+$`, "g"), "");
  }
  /**
   * Trim whitespace from the beginning of the string
   */
  static ltrim(value, characters) {
    if (!characters) return value.trimStart();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`^[${escaped}]+`, "g"), "");
  }
  /**
   * Trim whitespace from the end of the string
   */
  static rtrim(value, characters) {
    if (!characters) return value.trimEnd();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`[${escaped}]+$`, "g"), "");
  }
  /**
   * Make a string's first character uppercase
   */
  static ucfirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  /**
   * Split a string by uppercase characters
   */
  static ucsplit(value) {
    return value.match(/[A-Z][a-z]*/g) || [value];
  }
  /**
   * Convert the given string to uppercase
   */
  static upper(value) {
    return value.toUpperCase();
  }
  /**
   * Remove the specified strings from the beginning and end
   */
  static unwrap(value, before, after) {
    const actualAfter = after ?? before;
    let result = value;
    if (result.startsWith(before)) {
      result = result.substring(before.length);
    }
    if (result.endsWith(actualAfter)) {
      result = result.substring(0, result.length - actualAfter.length);
    }
    return result;
  }
  /**
   * Get the number of words a string contains
   */
  static wordCount(value) {
    return value.trim().split(/\s+/).filter((word) => word.length > 0).length;
  }
  /**
   * Wrap a string to a given number of characters
   */
  static wordWrap(value, characters = 75, breakStr = "\n") {
    const words = value.split(" ");
    let line = "";
    const lines = [];
    words.forEach((word) => {
      if ((line + word).length > characters) {
        if (line) lines.push(line.trim());
        line = word + " ";
      } else {
        line += word + " ";
      }
    });
    if (line) lines.push(line.trim());
    return lines.join(breakStr);
  }
  /**
   * Limit the number of words in a string
   */
  static words(value, words = 100, end = "...") {
    const wordArray = value.split(/\s+/);
    if (wordArray.length <= words) return value;
    return wordArray.slice(0, words).join(" ") + end;
  }
  /**
   * Wrap the string with the given strings
   */
  static wrap(value, before, after) {
    const actualAfter = after ?? before;
    return before + value + actualAfter;
  }
};
var MultipleInstanceManager = class {
  constructor() {
    this.instances = /* @__PURE__ */ new Map();
    this.pending = /* @__PURE__ */ new Map();
    this.customCreators = /* @__PURE__ */ new Map();
    this.driverKey = "driver";
  }
  /**
   * Create a driver instance asynchronously.
   * Called by `instanceAsync()` when no custom creator is registered.
   *
   * Override this for drivers that require async initialization
   * (e.g., establishing connections, loading remote config).
   *
   * By default, falls back to the sync `createDriver()`.
   *
   * @param driver - The driver name from config
   * @param config - The raw instance config
   * @returns A promise that resolves to the driver instance
   */
  async createDriverAsync(driver, config) {
    return this.createDriver(driver, config);
  }
  // ── Lifecycle hook ──────────────────────────────────────────────────────
  /**
   * Called after a new instance is created and before it's cached.
   * Override to configure instances (e.g., set names, event dispatchers).
   *
   * @param name - The instance name
   * @param instance - The newly created instance
   * @returns The instance (possibly modified)
   */
  onInstanceCreated(_name, instance) {
    return instance;
  }
  // ── Public API — Sync ───────────────────────────────────────────────────
  /**
   * Get an instance by name (sync).
   *
   * Returns a cached instance if available, otherwise resolves
   * via `createDriver()` and caches it.
   *
   * @param name - Instance name (uses default if omitted)
   */
  instance(name) {
    const instanceName = name ?? this.getDefaultInstance();
    const existing = this.instances.get(instanceName);
    if (existing) {
      return existing;
    }
    const resolved = this.resolve(instanceName);
    this.instances.set(instanceName, resolved);
    return resolved;
  }
  // ── Public API — Async ──────────────────────────────────────────────────
  /**
   * Get an instance by name (async).
   *
   * Returns a cached instance if available, otherwise resolves
   * via `createDriverAsync()` and caches it.
   *
   * Deduplicates in-flight resolutions — if two callers request
   * the same instance simultaneously, they share one Promise.
   *
   * @param name - Instance name (uses default if omitted)
   *
   * @example
   * ```typescript
   * // In RedisManager:
   * async connection(name?: string): Promise<RedisConnection> {
   *   return this.instanceAsync(name);
   * }
   * ```
   */
  async instanceAsync(name) {
    const instanceName = name ?? this.getDefaultInstance();
    const existing = this.instances.get(instanceName);
    if (existing) {
      return existing;
    }
    let promise = this.pending.get(instanceName);
    if (!promise) {
      promise = this.resolveAsync(instanceName);
      this.pending.set(instanceName, promise);
    }
    try {
      const resolved = await promise;
      this.instances.set(instanceName, resolved);
      return resolved;
    } finally {
      this.pending.delete(instanceName);
    }
  }
  // ── Public API — Registration ───────────────────────────────────────────
  /**
   * Register a custom driver creator.
   * Custom creators take priority over built-in drivers.
   */
  extend(driver, creator) {
    this.customCreators.set(driver, creator);
    return this;
  }
  // ── Public API — Cache management ───────────────────────────────────────
  /**
   * Remove a cached instance, forcing re-creation on next access.
   *
   * @param name - Instance name(s). Uses default if omitted.
   */
  forgetInstance(name) {
    const names = name ? Array.isArray(name) ? name : [name] : [this.getDefaultInstance()];
    for (const n of names) {
      this.instances.delete(n);
    }
    return this;
  }
  /**
   * Remove all cached instances.
   */
  purge() {
    this.instances.clear();
    this.pending.clear();
  }
  /**
   * Check if an instance has been resolved and cached.
   */
  hasInstance(name) {
    return this.instances.has(name);
  }
  /**
   * Get all resolved instance names.
   */
  getResolvedInstances() {
    return Array.from(this.instances.keys());
  }
  /**
   * Manually set a resolved instance in the cache.
   * Useful when instance creation happens outside the normal
   * `instance()` / `instanceAsync()` flow.
   */
  setInstance(name, instance) {
    this.instances.set(name, instance);
  }
  // ── Deprecated aliases (backward compat) ────────────────────────────────
  /**
   * @deprecated Use `hasInstance()` instead.
   */
  hasResolvedInstance(name) {
    return this.hasInstance(name);
  }
  // ── Private — Sync resolution ───────────────────────────────────────────
  resolve(name) {
    const config = this.getInstanceConfig(name);
    if (!config) {
      throw new Error(`Instance [${name}] is not defined.`);
    }
    const driver = config[this.driverKey];
    if (!driver) {
      throw new Error(`Instance [${name}] does not specify a "${this.driverKey}".`);
    }
    const customCreator = this.customCreators.get(driver);
    const instance = customCreator ? customCreator(config) : this.createDriver(driver, config);
    return this.onInstanceCreated(name, instance);
  }
  // ── Private — Async resolution ──────────────────────────────────────────
  async resolveAsync(name) {
    const config = this.getInstanceConfig(name);
    if (!config) {
      throw new Error(`Instance [${name}] is not defined.`);
    }
    const driver = config[this.driverKey];
    if (!driver) {
      throw new Error(`Instance [${name}] does not specify a "${this.driverKey}".`);
    }
    const customCreator = this.customCreators.get(driver);
    const instance = customCreator ? customCreator(config) : await this.createDriverAsync(driver, config);
    return this.onInstanceCreated(name, instance);
  }
};
({
  [LogLevel.Debug]: "color: #8B8B8B",
  [LogLevel.Info]: "color: #2196F3",
  [LogLevel.Warn]: "color: #FF9800",
  [LogLevel.Error]: "color: #F44336",
  [LogLevel.Fatal]: "color: #FFFFFF; background: #F44336; font-weight: bold; padding: 1px 4px; border-radius: 2px"
});
var REPORTER_METADATA = "REPORTER_METADATA";
var LOGGER_STATIC_REF = "LoggerStaticRef";
function Reporter(options) {
  return (target) => {
    Injectable2()(target);
    defineMetadata(REPORTER_METADATA, options, target);
  };
}
function toConsolaLevel(level) {
  switch (level) {
    case LogLevel.Debug:
      return 4;
    case LogLevel.Info:
      return 3;
    case LogLevel.Warn:
      return 2;
    case LogLevel.Error:
      return 1;
    case LogLevel.Fatal:
      return 0;
    default:
      return 3;
  }
}
var ConsoleReporter = class {
  /**
   * Create a new ConsoleReporter instance.
   *
   * @param options - Optional configuration for level and tag
   */
  constructor(options = {}) {
    this.name = "console";
    this._level = options.level ?? LogLevel.Debug;
    this.consola = createConsola2({
      level: toConsolaLevel(this._level),
      defaults: {
        tag: options.tag ?? "app"
      }
    });
  }
  /**
   * Deliver a log entry to the browser console.
   *
   * Routes the entry to the appropriate consola method based on
   * the log level. Context is passed as additional arguments so
   * DevTools can expand it as a structured object.
   *
   * Entries below the configured minimum level are silently skipped.
   *
   * @param entry - The log entry to output
   */
  report(entry) {
    if (entry.level < this._level) {
      return;
    }
    const hasContext = entry.context && Object.keys(entry.context).length > 0;
    switch (entry.level) {
      case LogLevel.Debug:
        hasContext ? this.consola.debug(entry.message, entry.context) : this.consola.debug(entry.message);
        break;
      case LogLevel.Info:
        hasContext ? this.consola.info(entry.message, entry.context) : this.consola.info(entry.message);
        break;
      case LogLevel.Warn:
        hasContext ? this.consola.warn(entry.message, entry.context) : this.consola.warn(entry.message);
        break;
      case LogLevel.Error:
        hasContext ? this.consola.error(entry.message, entry.context) : this.consola.error(entry.message);
        break;
      case LogLevel.Fatal:
        hasContext ? this.consola.fatal(entry.message, entry.context) : this.consola.fatal(entry.message);
        break;
      default:
        hasContext ? this.consola.log(entry.message, entry.context) : this.consola.log(entry.message);
    }
  }
  /**
   * No-op flush — console output is immediate.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
    this.consola.level = toConsolaLevel(level);
  }
};
ConsoleReporter = __decorateClass3([
  Reporter({ name: "console" })
], ConsoleReporter);
var LoggerService = class _LoggerService {
  constructor(configOrContext) {
    this._level = LogLevel.Debug;
    this._sharedContext = {};
    if (typeof configOrContext === "string" || configOrContext === void 0) {
      this._mode = "facade";
      this._contextString = configOrContext;
    } else {
      this._mode = "config";
      this._config = configOrContext;
      this._reporters = configOrContext.reporters ?? [new ConsoleReporter()];
      this._level = configOrContext.level ?? LogLevel.Debug;
      if (configOrContext.context) {
        this._sharedContext = { ...configOrContext.context };
      }
    }
  }
  static {
    this.staticManagerRef = void 0;
  }
  /**
   * Set the static LoggerManager reference.
   * Called automatically by `LoggerModule.forRoot()` during bootstrap.
   *
   * @param manager - The bootstrapped LoggerManager instance
   */
  static overrideLogger(manager) {
    _LoggerService.staticManagerRef = manager;
  }
  static {
    this._fallbackLoggerInstance = void 0;
  }
  /**
   * Get the fallback logger instance (created lazily on first access).
   *
   * @returns A minimal LoggerService with console output at Warn level
   */
  static get _fallbackLogger() {
    if (!_LoggerService._fallbackLoggerInstance) {
      _LoggerService._fallbackLoggerInstance = new _LoggerService({
        reporters: [new ConsoleReporter({ level: LogLevel.Warn })]
      });
    }
    return _LoggerService._fallbackLoggerInstance;
  }
  // ── Log methods ─────────────────────────────────────────────────────────
  /**
   * Log a message at the debug level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  debug(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("debug", message, context);
    } else {
      this.emit(LogLevel.Debug, message, context);
    }
  }
  /**
   * Log a message at the info level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  info(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("info", message, context);
    } else {
      this.emit(LogLevel.Info, message, context);
    }
  }
  /**
   * Log a message at the warn level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  warn(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("warn", message, context);
    } else {
      this.emit(LogLevel.Warn, message, context);
    }
  }
  /**
   * Log a message at the error level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  error(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("error", message, context);
    } else {
      this.emit(LogLevel.Error, message, context);
    }
  }
  /**
   * Log a message at the fatal level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  fatal(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("fatal", message, context);
    } else {
      this.emit(LogLevel.Fatal, message, context);
    }
  }
  // ── Context management ──────────────────────────────────────────────────
  /**
   * Add persistent context merged into every future log entry.
   *
   * @param context - Key-value pairs to add to the shared context
   * @returns This instance for fluent chaining
   *
   * @example
   * ```typescript
   * logger.withContext({ requestId: 'abc-123', userId: '42' });
   * logger.info('Processing'); // includes requestId and userId
   * ```
   */
  withContext(context) {
    this._sharedContext = { ...this._sharedContext, ...context };
    return this;
  }
  /**
   * Remove keys from shared context, or clear it entirely.
   *
   * @param keys - Optional array of keys to remove. Omit to clear all.
   * @returns This instance for fluent chaining
   */
  withoutContext(keys) {
    if (!keys) {
      this._sharedContext = {};
    } else {
      for (const key of keys) {
        delete this._sharedContext[key];
      }
    }
    return this;
  }
  // ── Accessors ───────────────────────────────────────────────────────────
  /**
   * Get the reporters for this logger instance.
   *
   * @returns Array of active reporter instances
   */
  getReporters() {
    if (this._mode === "facade") {
      return this.resolveDelegate().getReporters();
    }
    return this._reporters;
  }
  /**
   * Get the configuration for this logger instance.
   *
   * @returns The ILoggerConfig, or undefined in facade mode
   */
  getConfig() {
    if (this._mode === "facade") {
      return this.resolveDelegate().getConfig();
    }
    return this._config;
  }
  // ── Private — Facade delegation ─────────────────────────────────────────
  /**
   * Resolve the delegate LoggerService for facade mode.
   * Returns the default channel from the static manager, or the fallback logger.
   *
   * @returns The resolved LoggerService to delegate calls to
   */
  resolveDelegate() {
    if (_LoggerService.staticManagerRef) {
      return _LoggerService.staticManagerRef.channel();
    }
    return _LoggerService._fallbackLogger;
  }
  /**
   * Dispatch a log call in facade mode: resolve delegate, merge contexts, call method.
   *
   * @param method - The log level method name
   * @param message - The log message
   * @param callContext - Per-call context data
   */
  facadeDispatch(method, message, callContext) {
    const delegate = this.resolveDelegate();
    const mergedContext = {
      ...this._contextString !== void 0 ? { context: this._contextString } : {},
      ...this._sharedContext,
      ...callContext
    };
    delegate[method](message, mergedContext);
  }
  // ── Private — Config-mode dispatch ──────────────────────────────────────
  /**
   * Emit a log entry to all reporters in config mode.
   *
   * Each reporter is wrapped in a try-catch to prevent a failing reporter
   * from blocking other reporters or crashing the application.
   *
   * @param level - The log level
   * @param message - The log message
   * @param context - Per-call context data
   */
  emit(level, message, context) {
    if (level < this._level) {
      return;
    }
    const entry = {
      level,
      message,
      context: { ...this._sharedContext, ...context },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    for (const reporter of this._reporters) {
      try {
        reporter.report(entry);
      } catch {
      }
    }
  }
};
var SilentReporter = class {
  constructor() {
    this.name = "silent";
    this._level = LogLevel.Debug;
  }
  /**
   * No-op report method. Silently discards the entry.
   *
   * @param _entry - The log entry (ignored)
   */
  report(_entry) {
  }
  /**
   * No-op flush.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
  }
};
SilentReporter = __decorateClass3([
  Reporter({ name: "silent" })
], SilentReporter);
var LoggerManager = class extends MultipleInstanceManager {
  /**
   * Create a new LoggerManager instance.
   *
   * @param config - Logger module configuration (default channel, channels map)
   */
  constructor(config) {
    super();
    this.config = config;
    this.services = /* @__PURE__ */ new Map();
  }
  // ── Lifecycle ───────────────────────────────────────────────────────────
  /**
   * Called after all providers are instantiated.
   * Eagerly creates the default channel to catch config errors early.
   * If the default channel has issues, logs a warning instead of crashing.
   */
  onModuleInit() {
    try {
      this.channel();
    } catch (err) {
      console.warn(
        `[LoggerManager] Failed to create default channel '${this.config.default}':`,
        err.message
      );
    }
  }
  /**
   * Called on `app.close()`.
   * Flushes all reporters and clears internal caches.
   */
  async onModuleDestroy() {
    for (const [, service] of this.services) {
      for (const reporter of service.getReporters()) {
        reporter.flush?.();
      }
    }
    this.services.clear();
    this.purge();
  }
  // ── MultipleInstanceManager contract ────────────────────────────────────
  /**
   * Get the default channel name from configuration.
   *
   * @returns The default channel name (e.g., "console", "combined")
   */
  getDefaultInstance() {
    return this.config.default;
  }
  /**
   * Change the default channel at runtime.
   *
   * Subsequent calls to `channel()` without a name argument will
   * resolve to the new default. Does not affect already-resolved
   * LoggerService instances.
   *
   * @param name - The new default channel name (must exist in config)
   */
  setDefaultInstance(name) {
    this.config.default = name;
  }
  /**
   * Get the configuration for a named channel.
   *
   * Adds a synthetic `driver` field so the base class can resolve it.
   * The driver name is inferred from the first reporter's class name.
   *
   * @param name - Channel name to look up
   * @returns The channel configuration with a `driver` field, or `undefined`
   */
  getInstanceConfig(name) {
    const channelConfig = this.config.channels[name];
    if (!channelConfig) return void 0;
    const driver = this.resolveDriverName(channelConfig);
    return { driver, ...channelConfig };
  }
  /**
   * Create a channel driver instance (LoggerConfig).
   *
   * Called by the base class when a channel is requested for the first time.
   * Returns the channel config with default reporters if none specified.
   *
   * @param driver - Driver name inferred from reporters
   * @param config - Raw channel configuration
   * @returns A LoggerConfig with guaranteed reporters
   */
  createDriver(driver, config) {
    const channelConfig = config;
    if (!channelConfig.reporters || channelConfig.reporters.length === 0) {
      if (driver === "silent") {
        return { ...channelConfig, reporters: [new SilentReporter()] };
      }
      return { ...channelConfig, reporters: [new ConsoleReporter()] };
    }
    return channelConfig;
  }
  // ── Channel access ──────────────────────────────────────────────────────
  /**
   * Get a LoggerService for a named channel.
   *
   * The primary consumer API. Returns a LoggerService wrapping the
   * channel's reporters with debug, info, warn, error, fatal methods.
   * Cached — subsequent calls return the same instance.
   *
   * @param name - Channel name. Uses default if omitted.
   * @returns A LoggerService instance for the requested channel
   *
   * @example
   * ```typescript
   * const logger = manager.channel();           // default
   * const errors = manager.channel('errors');   // named
   * ```
   */
  channel(name) {
    const channelName = name ?? this.config.default;
    const existing = this.services.get(channelName);
    if (existing) return existing;
    const channelConfig = this.instance(channelName);
    const service = new LoggerService(channelConfig);
    this.services.set(channelName, service);
    return service;
  }
  // ── Introspection ───────────────────────────────────────────────────────
  /**
   * Get all configured channel names (from config, not just active).
   *
   * @returns Array of channel names
   */
  getChannelNames() {
    return Object.keys(this.config.channels);
  }
  /**
   * Check if a channel is configured (exists in config).
   *
   * @param name - Channel name to check
   * @returns `true` if the channel exists in configuration
   */
  hasChannel(name) {
    return name in this.config.channels;
  }
  /**
   * Check if a channel is currently active (cached and resolved).
   *
   * @param name - Channel name. Uses default if omitted.
   * @returns `true` if the channel has been resolved and cached
   */
  isChannelActive(name) {
    const channelName = name ?? this.config.default;
    return this.services.has(channelName);
  }
  // ── Channel management ──────────────────────────────────────────────────
  /**
   * Forget a cached channel and its LoggerService wrapper.
   * Forces re-creation on next `channel()` call.
   *
   * @param name - Channel name(s). Uses default if omitted.
   * @returns This instance for chaining
   */
  forgetChannel(name) {
    const names = name ? Array.isArray(name) ? name : [name] : [this.config.default];
    for (const n of names) {
      this.services.delete(n);
    }
    return this.forgetInstance(name);
  }
  /**
   * Clear all cached channels and LoggerService wrappers.
   * Forces full re-creation on next access.
   */
  purge() {
    this.services.clear();
    super.purge();
  }
  // ── Private helpers ─────────────────────────────────────────────────────
  /**
   * Resolve a driver name from channel config.
   * Used to populate the synthetic `driver` field for the base class.
   *
   * @param config - The channel configuration
   * @returns A driver name string (e.g., "console", "storage", "silent")
   */
  resolveDriverName(config) {
    if (!config.reporters || config.reporters.length === 0) {
      return "console";
    }
    const first = config.reporters[0];
    const name = Str.lower(first.constructor.name);
    if (Str.contains(name, "silent")) return "silent";
    if (Str.contains(name, "storage")) return "storage";
    return "console";
  }
};
LoggerManager = __decorateClass3([
  Injectable2(),
  __decorateParam2(0, Inject2(LOGGER_CONFIG))
], LoggerManager);
var ReporterLoader = class {
  constructor(discoveryService, loggerManager) {
    this.discoveryService = discoveryService;
    this.loggerManager = loggerManager;
  }
  /**
   * Called after all modules are initialized.
   * Scans providers for `@Reporter` metadata and attaches them to channels.
   */
  onApplicationBootstrap() {
    this.loadReporters();
  }
  /**
   * Scan all providers for `@Reporter`-decorated classes and attach them.
   */
  loadReporters() {
    const providers = this.discoveryService.getProviders();
    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance || wrapper.isAlias) continue;
      const constructor = instance.constructor;
      if (!constructor) continue;
      const reporterOptions = getMetadata(
        REPORTER_METADATA,
        constructor
      );
      if (!reporterOptions) continue;
      const reporter = instance;
      if (typeof reporter.report !== "function") {
        console.error(
          `[Logger] Reporter "${reporterOptions.name}" does not implement ILogReporter.report()`
        );
        continue;
      }
      if (reporterOptions.level !== void 0 && typeof reporter.setLevel === "function") {
        reporter.setLevel(reporterOptions.level);
      }
      const targetChannels = reporterOptions.channels && reporterOptions.channels.length > 0 ? reporterOptions.channels : this.loggerManager.getChannelNames();
      for (const channelName of targetChannels) {
        if (!this.loggerManager.hasChannel(channelName)) {
          console.warn(
            `[Logger] Reporter "${reporterOptions.name}" targets channel "${channelName}" which does not exist`
          );
          continue;
        }
        const channelLogger = this.loggerManager.channel(channelName);
        const existingReporters = channelLogger.getReporters();
        const alreadyAttached = existingReporters.some((r) => r.name === reporterOptions.name);
        if (!alreadyAttached) {
          existingReporters.push(reporter);
        }
      }
    }
  }
};
ReporterLoader = __decorateClass3([
  Injectable2()
], ReporterLoader);
var getLoggerChannelToken = (channelName = "default") => `LoggerChannel:${channelName}`;
var LoggerModule = class {
  /**
   * Configure the logger module.
   *
   * Channels are declared in config. Reporters are auto-discovered
   * from providers decorated with `@Reporter`.
   *
   * @param config - Logger configuration with named channels
   * @returns A DynamicModule with all logger providers
   */
  static forRoot(config) {
    const channelProviders = Object.keys(config.channels).map((channelName) => ({
      provide: getLoggerChannelToken(channelName),
      useFactory: (manager) => manager.channel(channelName),
      inject: [LoggerManager]
    }));
    const defaultChannelProvider = {
      provide: getLoggerChannelToken(),
      useFactory: (manager) => manager.channel(),
      inject: [LoggerManager]
    };
    const channelTokens = [
      getLoggerChannelToken(),
      ...Object.keys(config.channels).map(getLoggerChannelToken)
    ];
    return {
      module: LoggerModule,
      global: true,
      imports: [DiscoveryModule2],
      providers: [
        { provide: LOGGER_CONFIG, useValue: config },
        { provide: LoggerManager, useClass: LoggerManager },
        { provide: LOGGER_MANAGER, useExisting: LoggerManager },
        ReporterLoader,
        {
          provide: LOGGER_STATIC_REF,
          useFactory: (manager) => {
            LoggerService.staticManagerRef = manager;
            return manager;
          },
          inject: [LoggerManager]
        },
        defaultChannelProvider,
        ...channelProviders
      ],
      exports: [LoggerManager, LOGGER_MANAGER, LOGGER_CONFIG, ...channelTokens]
    };
  }
};
LoggerModule = __decorateClass3([
  Global2(),
  Module2({})
], LoggerModule);
var Logger = LoggerService;
var StorageReporter = class {
  /**
   * Create a new StorageReporter instance.
   *
   * @param options - Optional configuration for storage key, limits, and level
   */
  constructor(options = {}) {
    this.name = "storage";
    this._level = options.level ?? LogLevel.Debug;
    this._key = options.key ?? "logger:entries";
    this._maxEntries = options.maxEntries ?? 100;
  }
  /**
   * Persist a log entry to localStorage.
   *
   * The entry is serialized as JSON, appended to the existing entries
   * array, and trimmed to the maximum entry limit. If localStorage is
   * unavailable or full, the error is silently swallowed.
   *
   * @param entry - The log entry to persist
   */
  report(entry) {
    if (entry.level < this._level) {
      return;
    }
    try {
      const entries = this.readEntries();
      entries.push(entry);
      while (entries.length > this._maxEntries) {
        entries.shift();
      }
      localStorage.setItem(this._key, JSON.stringify(entries));
    } catch {
    }
  }
  /**
   * No-op flush — localStorage writes are synchronous.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
  }
  /**
   * Clear all stored log entries from localStorage.
   * Useful for manual cleanup or when resetting application state.
   */
  clear() {
    try {
      localStorage.removeItem(this._key);
    } catch {
    }
  }
  /**
   * Retrieve all stored log entries from localStorage.
   *
   * @returns An array of stored ILogEntry objects
   */
  getEntries() {
    return this.readEntries();
  }
  /**
   * Read the current entries array from localStorage.
   * Returns an empty array if the key does not exist or parsing fails.
   *
   * @returns The parsed entries array
   */
  readEntries() {
    try {
      const raw = localStorage.getItem(this._key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};
StorageReporter = __decorateClass3([
  Reporter({ name: "storage" })
], StorageReporter);
var ContainerContext = react.createContext(null);
ContainerContext.displayName = "ContainerContext";
inject2(LoggerManager);

// src/services/local-storage-fallback.service.ts
var LocalStorageFallback = class _LocalStorageFallback {
  constructor(name, senderId) {
    this.name = name;
    this.senderId = senderId;
    this.logger = new Logger(_LocalStorageFallback.name);
    this.cleanupTimer = null;
    this.closed = false;
    this.messageCounter = 0;
    /** Callback for incoming messages (mirrors BroadcastChannel API). */
    this.onmessage = null;
    this.storagePrefix = `__coordinator_msg__${name}__`;
    this.storageHandler = (event) => {
      if (this.closed) return;
      if (!event.key || !event.key.startsWith(this.storagePrefix)) return;
      if (!event.newValue) return;
      try {
        const message = JSON.parse(event.newValue);
        if (message.senderId === this.senderId) return;
        if (this.onmessage) {
          this.onmessage({ data: message.data });
        }
      } catch {
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.storageHandler);
      this.cleanupTimer = setInterval(() => this.cleanup(), 5e3);
    }
  }
  /**
   * Post a message to all other tabs via localStorage.
   *
   * Writes the message to a unique localStorage key (triggering `storage`
   * events in other tabs). Messages are cleaned up periodically.
   */
  postMessage(data) {
    if (this.closed) return;
    if (typeof localStorage === "undefined") return;
    const message = {
      senderId: this.senderId,
      data,
      at: Date.now()
    };
    const key = `${this.storagePrefix}${Date.now()}_${this.messageCounter++}`;
    try {
      localStorage.setItem(key, JSON.stringify(message));
      setTimeout(() => {
        try {
          localStorage.removeItem(key);
        } catch {
        }
      }, 500);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      this.logger.warn(`[LocalStorageFallback] Failed to post message: ${msg}`);
    }
  }
  /**
   * Close the fallback channel and stop listening.
   */
  close() {
    this.closed = true;
    this.onmessage = null;
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.storageHandler);
    }
  }
  /**
   * Remove stale messages from localStorage.
   */
  cleanup() {
    if (typeof localStorage === "undefined") return;
    const now = Date.now();
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(this.storagePrefix)) continue;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const message = JSON.parse(raw);
        if (now - message.at > 1e4) {
          keysToRemove.push(key);
        }
      } catch {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      try {
        localStorage.removeItem(key);
      } catch {
      }
    }
  }
};

// src/services/tab-coordinator.service.ts
exports.TabCoordinator = class TabCoordinator {
  constructor(config = {}) {
    this.logger = new Logger(exports.TabCoordinator.name);
    /** Current leader tab ID, or null if unknown. */
    this.leaderId = null;
    /** Epoch ms of the last heartbeat received from the leader. */
    this.lastHeartbeatAt = 0;
    /** Election epoch — incremented on each new election round. */
    this.electionEpoch = 0;
    /** Heartbeat timer handle (active only when this tab is leader). */
    this.heartbeatTimer = null;
    /** Stale-check timer handle (active only when this tab is follower). */
    this.staleCheckTimer = null;
    /** Pending claim timeout (for cancellation). */
    this.claimTimeout = null;
    /** Known tabs with their last-seen timestamps. */
    this.knownTabs = /* @__PURE__ */ new Map();
    /** Visibility change handler reference for cleanup. */
    this.visibilityHandler = null;
    /** Page hide handler reference for cleanup. */
    this.pageHideHandler = null;
    /** Whether this instance has been destroyed. */
    this.destroyed = false;
    /** AbortController for Web Locks election (to cancel on destroy). */
    this.webLocksAbortController = null;
    this.tabId = this.generateTabId();
    this.config = {
      channelName: config.channelName ?? "stackra-coordinator",
      heartbeatMs: config.heartbeatMs ?? 1e3,
      staleThresholdMs: config.staleThresholdMs ?? 3e3,
      preferVisibleLeader: config.preferVisibleLeader ?? false,
      preferWebLocksElection: config.preferWebLocksElection ?? true
    };
    this.roleSubject = new rxjs.BehaviorSubject("follower");
    this.role$ = this.roleSubject.asObservable().pipe(operators.distinctUntilChanged());
    this.tabCountSubject = new rxjs.BehaviorSubject(1);
    this.tabCount$ = this.tabCountSubject.asObservable().pipe(operators.distinctUntilChanged());
    this.knownTabs.set(this.tabId, Date.now());
    if (typeof BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(`${this.config.channelName}:leader`);
      this.channel.onmessage = (event) => {
        this.onMessage(event.data);
      };
    } else if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
      this.channel = new LocalStorageFallback(
        `${this.config.channelName}:leader`,
        this.tabId
      );
      this.channel.onmessage = (event) => {
        this.onMessage(event.data);
      };
    } else {
      this.channel = null;
      this.becomeLeader();
    }
    if (this.channel) {
      queueMicrotask(() => {
        if (this.destroyed) return;
        this.announce();
        if (this.config.preferWebLocksElection && this.isWebLocksAvailable()) {
          this.startWebLocksElection();
        } else {
          this.claimLeadership();
        }
        this.startStaleCheck();
      });
    }
    if (typeof window !== "undefined") {
      this.pageHideHandler = () => this.onPageHide();
      window.addEventListener("pagehide", this.pageHideHandler);
      window.addEventListener("beforeunload", this.pageHideHandler);
    }
    if (this.config.preferVisibleLeader && typeof document !== "undefined") {
      this.visibilityHandler = () => this.onVisibilityChange();
      document.addEventListener("visibilitychange", this.visibilityHandler);
    }
  }
  // ── Public API ──────────────────────────────────────────────────────────
  /**
   * Whether this tab is currently the leader.
   */
  isLeader() {
    return this.leaderId === this.tabId;
  }
  /**
   * Get the current tab's unique ID.
   */
  getTabId() {
    return this.tabId;
  }
  /**
   * Get the current leader's tab ID, or null if unknown.
   */
  getLeaderId() {
    return this.leaderId;
  }
  /**
   * Get the current role of this tab.
   */
  getRole() {
    return this.roleSubject.value;
  }
  /**
   * Get information about all known active tabs.
   */
  getActiveTabs() {
    const now = Date.now();
    const tabs = [];
    for (const [id, lastSeen] of this.knownTabs) {
      if (now - lastSeen < this.config.staleThresholdMs * 2) {
        tabs.push({
          id,
          isLeader: id === this.leaderId,
          lastSeen,
          isSelf: id === this.tabId
        });
      }
    }
    return tabs;
  }
  /**
   * Get the number of active tabs.
   */
  getTabCount() {
    return this.getActiveTabs().length;
  }
  /**
   * Register a callback for when this tab becomes leader.
   *
   * @returns Unsubscribe function
   */
  onLeader(callback) {
    const subscription = this.role$.subscribe((role) => {
      if (role === "leader") callback();
    });
    return () => subscription.unsubscribe();
  }
  /**
   * Register a callback for when this tab loses leadership.
   *
   * @returns Unsubscribe function
   */
  onFollower(callback) {
    const subscription = this.role$.subscribe((role) => {
      if (role === "follower") callback();
    });
    return () => subscription.unsubscribe();
  }
  /**
   * Voluntarily resign leadership.
   *
   * Useful when the tab is about to close or navigate away.
   */
  resign() {
    if (!this.isLeader()) return;
    this.postMessage({ kind: "resigned", tabId: this.tabId });
    this.leaderId = null;
    this.stopHeartbeat();
    this.cancelPendingClaim();
    this.updateRole("follower");
    this.logger.info("[TabCoordinator] Resigned leadership");
  }
  /**
   * Cleanup all resources. Call on application shutdown.
   */
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.isLeader()) {
      this.resign();
    }
    if (this.webLocksAbortController) {
      this.webLocksAbortController.abort();
      this.webLocksAbortController = null;
    }
    this.stopHeartbeat();
    this.stopStaleCheck();
    this.cancelPendingClaim();
    this.channel?.close();
    if (this.visibilityHandler && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }
    if (this.pageHideHandler && typeof window !== "undefined") {
      window.removeEventListener("pagehide", this.pageHideHandler);
      window.removeEventListener("beforeunload", this.pageHideHandler);
    }
    this.roleSubject.complete();
    this.tabCountSubject.complete();
  }
  /**
   * Lifecycle hook — called by the DI container on module destroy.
   */
  onModuleDestroy() {
    this.destroy();
  }
  // ── Web Locks Election ──────────────────────────────────────────────────
  /**
   * Start leader election using the Web Locks API.
   *
   * The tab that holds the lock is the leader. When it closes or crashes,
   * the lock is automatically released and the next waiting tab gets it.
   * This is race-free and provides instant failover.
   */
  startWebLocksElection() {
    if (!this.isWebLocksAvailable()) return;
    const lockName = `${this.config.channelName}:leader-election`;
    this.webLocksAbortController = new AbortController();
    navigator.locks.request(
      lockName,
      { signal: this.webLocksAbortController.signal },
      async () => {
        if (this.destroyed) return;
        this.becomeLeader();
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (this.destroyed || !this.isLeader()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 500);
        });
      }
    ).catch((error) => {
      if (error instanceof Error && error.name === "AbortError") return;
      this.logger.warn(
        `[TabCoordinator] Web Locks election failed, falling back to heartbeat`
      );
      this.claimLeadership();
    });
  }
  // ── Leader Election Protocol (Heartbeat Fallback) ───────────────────────
  /**
   * Announce this tab's presence to all peers.
   */
  announce() {
    this.postMessage({ kind: "announce", tabId: this.tabId, at: Date.now() });
  }
  /**
   * Attempt to claim leadership.
   *
   * If no leader is known or the current leader is stale, this tab
   * broadcasts a claim. After a short delay, if no higher-priority
   * tab has claimed, this tab becomes leader.
   */
  claimLeadership() {
    if (this.leaderId && Date.now() - this.lastHeartbeatAt < this.config.staleThresholdMs) {
      return;
    }
    this.cancelPendingClaim();
    this.electionEpoch++;
    const claimEpoch = this.electionEpoch;
    this.postMessage({
      kind: "claim",
      tabId: this.tabId,
      at: Date.now(),
      epoch: claimEpoch
    });
    this.claimTimeout = setTimeout(() => {
      this.claimTimeout = null;
      if (claimEpoch !== this.electionEpoch) return;
      if (this.destroyed) return;
      if (!this.leaderId || this.leaderId === this.tabId) {
        this.becomeLeader();
      }
    }, this.config.heartbeatMs);
  }
  /**
   * Cancel a pending claim timeout.
   */
  cancelPendingClaim() {
    if (this.claimTimeout) {
      clearTimeout(this.claimTimeout);
      this.claimTimeout = null;
    }
  }
  /**
   * Promote this tab to leader.
   */
  becomeLeader() {
    const wasLeader = this.isLeader();
    this.leaderId = this.tabId;
    this.startHeartbeat();
    this.updateRole("leader");
    if (!wasLeader) {
      this.logger.info(`[TabCoordinator] Became leader (tabId: ${this.tabId})`);
    }
  }
  /**
   * Handle incoming messages from peer tabs.
   */
  onMessage(msg) {
    if (this.destroyed) return;
    if ("tabId" in msg) {
      this.knownTabs.set(msg.tabId, Date.now());
      this.updateTabCount();
    }
    switch (msg.kind) {
      case "heartbeat":
        this.onHeartbeat(msg);
        break;
      case "claim":
        this.onClaim(msg);
        break;
      case "resigned":
        this.onResigned(msg);
        break;
      case "announce":
        this.onAnnounce(msg);
        break;
      case "yield-request":
        this.onYieldRequest(msg);
        break;
    }
  }
  onHeartbeat(msg) {
    this.leaderId = msg.tabId;
    this.lastHeartbeatAt = msg.at;
    if (this.isLeader() && msg.tabId !== this.tabId) {
      this.stopHeartbeat();
      this.cancelPendingClaim();
      this.updateRole("follower");
    }
  }
  onClaim(msg) {
    if (this.isLeader() && msg.tabId < this.tabId) {
      this.stopHeartbeat();
      this.cancelPendingClaim();
      this.leaderId = msg.tabId;
      this.lastHeartbeatAt = msg.at;
      this.electionEpoch = msg.epoch;
      this.updateRole("follower");
    } else if (!this.leaderId && msg.tabId < this.tabId) {
      this.leaderId = msg.tabId;
      this.lastHeartbeatAt = msg.at;
      this.electionEpoch = msg.epoch;
      this.cancelPendingClaim();
    }
  }
  onResigned(msg) {
    if (this.leaderId === msg.tabId) {
      this.leaderId = null;
      if (!this.config.preferWebLocksElection || !this.isWebLocksAvailable()) {
        this.claimLeadership();
      }
    }
  }
  onAnnounce(_msg) {
    if (this.isLeader()) {
      this.postMessage({
        kind: "heartbeat",
        tabId: this.tabId,
        at: Date.now(),
        epoch: this.electionEpoch
      });
    }
  }
  onYieldRequest(msg) {
    if (!this.isLeader()) return;
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      this.logger.info(`[TabCoordinator] Yielding to visible tab ${msg.tabId}`);
      this.resign();
    }
  }
  // ── Heartbeat ───────────────────────────────────────────────────────────
  /**
   * Start the heartbeat timer (leader only).
   */
  startHeartbeat() {
    this.stopHeartbeat();
    const beat = () => {
      this.postMessage({
        kind: "heartbeat",
        tabId: this.tabId,
        at: Date.now(),
        epoch: this.electionEpoch
      });
    };
    beat();
    this.heartbeatTimer = setInterval(beat, this.config.heartbeatMs);
  }
  /**
   * Stop the heartbeat timer.
   */
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  // ── Stale Detection ─────────────────────────────────────────────────────
  /**
   * Start the stale-check loop that detects leader failure.
   */
  startStaleCheck() {
    this.staleCheckTimer = setInterval(() => {
      if (this.destroyed) return;
      if (this.isLeader()) return;
      if (this.leaderId && Date.now() - this.lastHeartbeatAt > this.config.staleThresholdMs) {
        this.logger.info(
          `[TabCoordinator] Leader ${this.leaderId} is stale, claiming leadership`
        );
        this.leaderId = null;
        if (!this.config.preferWebLocksElection || !this.isWebLocksAvailable()) {
          this.claimLeadership();
        }
      }
      const now = Date.now();
      let pruned = false;
      for (const [id, lastSeen] of this.knownTabs) {
        if (id !== this.tabId && now - lastSeen > this.config.staleThresholdMs * 3) {
          this.knownTabs.delete(id);
          pruned = true;
        }
      }
      if (pruned) {
        this.updateTabCount();
      }
    }, this.config.heartbeatMs);
  }
  /**
   * Stop the stale-check loop.
   */
  stopStaleCheck() {
    if (this.staleCheckTimer) {
      clearInterval(this.staleCheckTimer);
      this.staleCheckTimer = null;
    }
  }
  // ── Visibility & Page Lifecycle ─────────────────────────────────────────
  /**
   * Handle visibility change events.
   *
   * When `preferVisibleLeader` is enabled, a visible follower tab
   * will send a yield request to the hidden leader.
   */
  onVisibilityChange() {
    if (!this.config.preferVisibleLeader) return;
    if (this.destroyed) return;
    if (document.visibilityState === "visible" && !this.isLeader()) {
      this.postMessage({
        kind: "yield-request",
        tabId: this.tabId,
        at: Date.now()
      });
    }
  }
  /**
   * Handle page hide / beforeunload events.
   *
   * Immediately resigns leadership so other tabs don't have to wait
   * for the stale threshold to expire.
   */
  onPageHide() {
    if (this.isLeader()) {
      this.resign();
    }
  }
  // ── Helpers ─────────────────────────────────────────────────────────────
  /**
   * Post a message to the BroadcastChannel (no-op if channel unavailable).
   */
  postMessage(msg) {
    this.channel?.postMessage(msg);
  }
  /**
   * Update the role subject if the role actually changed.
   */
  updateRole(role) {
    if (this.roleSubject.value !== role) {
      this.roleSubject.next(role);
    }
  }
  /**
   * Update the tab count subject.
   */
  updateTabCount() {
    const count = this.getTabCount();
    if (this.tabCountSubject.value !== count) {
      this.tabCountSubject.next(count);
    }
  }
  /**
   * Check if the Web Locks API is available.
   */
  isWebLocksAvailable() {
    return typeof navigator !== "undefined" && "locks" in navigator;
  }
  /**
   * Generate a unique tab identifier.
   *
   * Uses crypto.randomUUID when available, falls back to timestamp + random.
   */
  generateTabId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};
exports.TabCoordinator = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional()),
  __decorateParam(0, Inject(COORDINATOR_CONFIG))
], exports.TabCoordinator);

// src/errors/coordinator.error.ts
var CoordinatorError = class extends Error {
  constructor(message, code = "COORDINATOR_ERROR", context) {
    super(message);
    this.name = "CoordinatorError";
    this.code = code;
    this.context = context;
  }
};

// src/services/lock-manager.service.ts
exports.LockManager = class LockManager {
  constructor(config = {}) {
    /** Track active abort controllers for cleanup. */
    this.activeControllers = /* @__PURE__ */ new Set();
    this.preferWebLocks = config.preferWebLocks ?? true;
    this.channelName = config.channelName ?? "stackra-coordinator";
  }
  /**
   * Acquire a named lock and run the callback.
   *
   * Only one tab can hold a given lock at a time. Other tabs wait
   * until the lock is released.
   *
   * @param name - Lock name (should be descriptive, e.g. "sync", "token-refresh")
   * @param callback - The critical section to execute while holding the lock
   * @param options - Lock options (timeout, steal)
   * @returns The return value of the callback
   * @throws CoordinatorError if the lock cannot be acquired within the timeout
   *
   * @example
   * ```typescript
   * await lockManager.run("database-migration", async () => {
   *   await runMigrations();
   * });
   * ```
   */
  async run(name, callback, options = {}) {
    const lockName = `${this.channelName}:lock:${name}`;
    if (this.preferWebLocks && this.isWebLocksAvailable()) {
      return this.runWithWebLocks(lockName, callback, options);
    }
    return this.runWithFallback(lockName, callback, options);
  }
  /**
   * Check if a lock is currently held (best-effort).
   *
   * Only works with Web Locks API. Returns false if Web Locks unavailable.
   *
   * @param name - Lock name to check
   */
  async isLocked(name) {
    const lockName = `${this.channelName}:lock:${name}`;
    if (!this.isWebLocksAvailable()) {
      return false;
    }
    const state = await navigator.locks.query();
    return state.held?.some((lock2) => lock2.name === lockName) ?? false;
  }
  /**
   * Lifecycle hook — called by the DI container on module destroy.
   */
  onModuleDestroy() {
    for (const controller of this.activeControllers) {
      controller.abort();
    }
    this.activeControllers.clear();
  }
  // ── Web Locks Implementation ────────────────────────────────────────────
  /**
   * Acquire lock using the Web Locks API.
   */
  async runWithWebLocks(lockName, callback, options) {
    const { timeoutMs } = options;
    const lockOptions = {
      mode: "exclusive"
    };
    if (timeoutMs) {
      const controller = new AbortController();
      this.activeControllers.add(controller);
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      lockOptions.signal = controller.signal;
      try {
        return await navigator.locks.request(
          lockName,
          lockOptions,
          async () => {
            clearTimeout(timer);
            return await callback();
          }
        );
      } catch (error) {
        clearTimeout(timer);
        if (error instanceof Error && error.name === "AbortError") {
          throw new CoordinatorError(
            `Lock "${lockName}" acquisition timed out after ${timeoutMs}ms`,
            "LOCK_TIMEOUT",
            { lockName, timeoutMs }
          );
        }
        throw error;
      } finally {
        this.activeControllers.delete(controller);
      }
    }
    return navigator.locks.request(lockName, lockOptions, async () => {
      return await callback();
    });
  }
  // ── Fallback Implementation ─────────────────────────────────────────────
  /**
   * Fallback lock using localStorage + polling.
   *
   * Not as robust as Web Locks but works in all browsers.
   * Uses a simple lock-file pattern with expiry.
   */
  async runWithFallback(lockName, callback, options) {
    const { timeoutMs = 3e4 } = options;
    const lockKey = `__lock__${lockName}`;
    const lockValue = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const lockExpiry = 3e4;
    const startTime = Date.now();
    while (true) {
      const existing = this.getStorageLock(lockKey);
      if (!existing || Date.now() - existing.at > lockExpiry) {
        this.setStorageLock(lockKey, lockValue);
        await this.sleep(50);
        const check = this.getStorageLock(lockKey);
        if (check && check.value === lockValue) {
          try {
            return await callback();
          } finally {
            this.clearStorageLock(lockKey, lockValue);
          }
        }
      }
      if (Date.now() - startTime > timeoutMs) {
        throw new CoordinatorError(
          `Lock "${lockName}" acquisition timed out after ${timeoutMs}ms (fallback)`,
          "LOCK_TIMEOUT",
          { lockName, timeoutMs }
        );
      }
      await this.sleep(100 + Math.random() * 100);
    }
  }
  // ── Helpers ─────────────────────────────────────────────────────────────
  isWebLocksAvailable() {
    return typeof navigator !== "undefined" && "locks" in navigator;
  }
  getStorageLock(key) {
    if (typeof localStorage === "undefined") return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  setStorageLock(key, value) {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify({ value, at: Date.now() }));
    } catch {
    }
  }
  clearStorageLock(key, expectedValue) {
    if (typeof localStorage === "undefined") return;
    try {
      const existing = this.getStorageLock(key);
      if (existing && existing.value === expectedValue) {
        localStorage.removeItem(key);
      }
    } catch {
    }
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
exports.LockManager = __decorateClass([
  Injectable(),
  __decorateParam(0, Optional()),
  __decorateParam(0, Inject(COORDINATOR_CONFIG))
], exports.LockManager);
var __create3 = Object.create;
var __defProp4 = Object.defineProperty;
var __getOwnPropDesc4 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames3 = Object.getOwnPropertyNames;
var __getProtoOf3 = Object.getPrototypeOf;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS3 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps3 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames3(from))
      if (!__hasOwnProp3.call(to, key) && key !== except)
        __defProp4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc4(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp4(target, "default", { value: mod, enumerable: true }),
  mod
));
var __decorateClass4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __decorateParam3 = (index, decorator) => (target, key) => decorator(target, key, index);
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "", value);
var require_Reflect3 = __commonJS3({
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
        function defineMetadata5(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata5);
        function hasMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata2);
        function hasOwnMetadata2(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata2);
        function getMetadata6(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata6);
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
          var hint = "string";
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
          var valueOf, result;
          {
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
            argument
          );
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
          var defineMetadata6 = reflect.defineMetadata, hasOwnMetadata3 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
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
            OrdinaryDefineOwnMetadata: defineMetadata6,
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
var require_symbol_iterator2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/symbol.iterator.js"(exports, module) {
    module.exports = function SymbolIterator() {
      var _this = this;
      var index = -1;
      return {
        next: function next() {
          index += 1;
          return {
            value: _this.items[index],
            done: index >= _this.items.length
          };
        }
      };
    };
  }
});
var require_all2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/all.js"(exports, module) {
    module.exports = function all() {
      return this.items;
    };
  }
});
var require_is2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/is.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = {
      /**
       * @returns {boolean}
       */
      isArray: function isArray(item) {
        return Array.isArray(item);
      },
      /**
       * @returns {boolean}
       */
      isObject: function isObject(item) {
        return _typeof(item) === "object" && Array.isArray(item) === false && item !== null;
      },
      /**
       * @returns {boolean}
       */
      isFunction: function isFunction(item) {
        return typeof item === "function";
      }
    };
  }
});
var require_average2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/average.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function average(key) {
      if (key === void 0) {
        return this.sum() / this.items.length;
      }
      if (isFunction(key)) {
        return new this.constructor(this.items).sum(key) / this.items.length;
      }
      return new this.constructor(this.items).pluck(key).sum() / this.items.length;
    };
  }
});
var require_avg2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/avg.js"(exports, module) {
    var average = require_average2();
    module.exports = average;
  }
});
var require_chunk2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/chunk.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function chunk(size) {
      var _this = this;
      var chunks = [];
      var index = 0;
      if (Array.isArray(this.items)) {
        do {
          var items = this.items.slice(index, index + size);
          var collection = new this.constructor(items);
          chunks.push(collection);
          index += size;
        } while (index < this.items.length);
      } else if (_typeof(this.items) === "object") {
        var keys = Object.keys(this.items);
        var _loop = function _loop2() {
          var keysOfChunk = keys.slice(index, index + size);
          var collection2 = new _this.constructor({});
          keysOfChunk.forEach(function(key) {
            return collection2.put(key, _this.items[key]);
          });
          chunks.push(collection2);
          index += size;
        };
        do {
          _loop();
        } while (index < keys.length);
      } else {
        chunks.push(new this.constructor([this.items]));
      }
      return new this.constructor(chunks);
    };
  }
});
var require_collapse2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/collapse.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function collapse() {
      var _ref;
      return new this.constructor((_ref = []).concat.apply(_ref, _toConsumableArray(this.items)));
    };
  }
});
var require_combine2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/combine.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function combine(array) {
      var _this = this;
      var values = array;
      if (values instanceof this.constructor) {
        values = array.all();
      }
      var collection = {};
      if (Array.isArray(this.items) && Array.isArray(values)) {
        this.items.forEach(function(key, iterator) {
          collection[key] = values[iterator];
        });
      } else if (_typeof(this.items) === "object" && _typeof(values) === "object") {
        Object.keys(this.items).forEach(function(key, index) {
          collection[_this.items[key]] = values[Object.keys(values)[index]];
        });
      } else if (Array.isArray(this.items)) {
        collection[this.items[0]] = values;
      } else if (typeof this.items === "string" && Array.isArray(values)) {
        var _values = values;
        var _values2 = _slicedToArray(_values, 1);
        collection[this.items] = _values2[0];
      } else if (typeof this.items === "string") {
        collection[this.items] = values;
      }
      return new this.constructor(collection);
    };
  }
});
var require_clone2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/clone.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function clone(items) {
      var cloned;
      if (Array.isArray(items)) {
        var _cloned;
        cloned = [];
        (_cloned = cloned).push.apply(_cloned, _toConsumableArray(items));
      } else {
        cloned = {};
        Object.keys(items).forEach(function(prop) {
          cloned[prop] = items[prop];
        });
      }
      return cloned;
    };
  }
});
var require_concat2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/concat.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    var clone = require_clone2();
    module.exports = function concat(collectionOrArrayOrObject) {
      var list = collectionOrArrayOrObject;
      if (collectionOrArrayOrObject instanceof this.constructor) {
        list = collectionOrArrayOrObject.all();
      } else if (_typeof(collectionOrArrayOrObject) === "object") {
        list = [];
        Object.keys(collectionOrArrayOrObject).forEach(function(property) {
          list.push(collectionOrArrayOrObject[property]);
        });
      }
      var collection = clone(this.items);
      list.forEach(function(item) {
        if (_typeof(item) === "object") {
          Object.keys(item).forEach(function(key) {
            return collection.push(item[key]);
          });
        } else {
          collection.push(item);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_values3 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/values.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function values(items) {
      var valuesArray = [];
      if (Array.isArray(items)) {
        valuesArray.push.apply(valuesArray, _toConsumableArray(items));
      } else if (items.constructor.name === "Collection") {
        valuesArray.push.apply(valuesArray, _toConsumableArray(items.all()));
      } else {
        Object.keys(items).forEach(function(prop) {
          return valuesArray.push(items[prop]);
        });
      }
      return valuesArray;
    };
  }
});
var require_contains2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/contains.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var values = require_values3();
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function contains(key, value) {
      if (value !== void 0) {
        if (Array.isArray(this.items)) {
          return this.items.filter(function(items) {
            return items[key] !== void 0 && items[key] === value;
          }).length > 0;
        }
        return this.items[key] !== void 0 && this.items[key] === value;
      }
      if (isFunction(key)) {
        return this.items.filter(function(item, index) {
          return key(item, index);
        }).length > 0;
      }
      if (Array.isArray(this.items)) {
        return this.items.indexOf(key) !== -1;
      }
      var keysAndValues = values(this.items);
      keysAndValues.push.apply(keysAndValues, _toConsumableArray(Object.keys(this.items)));
      return keysAndValues.indexOf(key) !== -1;
    };
  }
});
var require_containsOneItem2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/containsOneItem.js"(exports, module) {
    module.exports = function containsOneItem() {
      return this.count() === 1;
    };
  }
});
var require_count2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/count.js"(exports, module) {
    module.exports = function count() {
      var arrayLength = 0;
      if (Array.isArray(this.items)) {
        arrayLength = this.items.length;
      }
      return Math.max(Object.keys(this.items).length, arrayLength);
    };
  }
});
var require_countBy2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/countBy.js"(exports, module) {
    module.exports = function countBy() {
      var fn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(value) {
        return value;
      };
      return new this.constructor(this.items).groupBy(fn).map(function(value) {
        return value.count();
      });
    };
  }
});
var require_crossJoin2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/crossJoin.js"(exports, module) {
    module.exports = function crossJoin() {
      function join(collection, constructor, args) {
        var current = args[0];
        if (current instanceof constructor) {
          current = current.all();
        }
        var rest = args.slice(1);
        var last = !rest.length;
        var result = [];
        for (var i = 0; i < current.length; i += 1) {
          var collectionCopy = collection.slice();
          collectionCopy.push(current[i]);
          if (last) {
            result.push(collectionCopy);
          } else {
            result = result.concat(join(collectionCopy, constructor, rest));
          }
        }
        return result;
      }
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }
      return new this.constructor(join([], this.constructor, [].concat([this.items], values)));
    };
  }
});
var require_dd2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/dd.js"(exports, module) {
    module.exports = function dd() {
      this.dump();
      if (typeof process !== "undefined") {
        process.exit(1);
      }
    };
  }
});
var require_diff2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diff.js"(exports, module) {
    module.exports = function diff(values) {
      var valuesToDiff;
      if (values instanceof this.constructor) {
        valuesToDiff = values.all();
      } else {
        valuesToDiff = values;
      }
      var collection = this.items.filter(function(item) {
        return valuesToDiff.indexOf(item) === -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_diffAssoc2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffAssoc.js"(exports, module) {
    module.exports = function diffAssoc(values) {
      var _this = this;
      var diffValues = values;
      if (values instanceof this.constructor) {
        diffValues = values.all();
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (diffValues[key] === void 0 || diffValues[key] !== _this.items[key]) {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_diffKeys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffKeys.js"(exports, module) {
    module.exports = function diffKeys(object) {
      var objectToDiff;
      if (object instanceof this.constructor) {
        objectToDiff = object.all();
      } else {
        objectToDiff = object;
      }
      var objectKeys = Object.keys(objectToDiff);
      var remainingKeys = Object.keys(this.items).filter(function(item) {
        return objectKeys.indexOf(item) === -1;
      });
      return new this.constructor(this.items).only(remainingKeys);
    };
  }
});
var require_diffUsing2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/diffUsing.js"(exports, module) {
    module.exports = function diffUsing(values, callback) {
      var collection = this.items.filter(function(item) {
        return !(values && values.some(function(otherItem) {
          return callback(item, otherItem) === 0;
        }));
      });
      return new this.constructor(collection);
    };
  }
});
var require_doesntContain2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/doesntContain.js"(exports, module) {
    module.exports = function contains(key, value) {
      return !this.contains(key, value);
    };
  }
});
var require_dump2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/dump.js"(exports, module) {
    module.exports = function dump() {
      console.log(this);
      return this;
    };
  }
});
var require_duplicates2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/duplicates.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function duplicates() {
      var _this = this;
      var occuredValues = [];
      var duplicateValues = {};
      var stringifiedValue = function stringifiedValue2(value) {
        if (Array.isArray(value) || _typeof(value) === "object") {
          return JSON.stringify(value);
        }
        return value;
      };
      if (Array.isArray(this.items)) {
        this.items.forEach(function(value, index) {
          var valueAsString = stringifiedValue(value);
          if (occuredValues.indexOf(valueAsString) === -1) {
            occuredValues.push(valueAsString);
          } else {
            duplicateValues[index] = value;
          }
        });
      } else if (_typeof(this.items) === "object") {
        Object.keys(this.items).forEach(function(key) {
          var valueAsString = stringifiedValue(_this.items[key]);
          if (occuredValues.indexOf(valueAsString) === -1) {
            occuredValues.push(valueAsString);
          } else {
            duplicateValues[key] = _this.items[key];
          }
        });
      }
      return new this.constructor(duplicateValues);
    };
  }
});
var require_each2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/each.js"(exports, module) {
    module.exports = function each(fn) {
      var stop = false;
      if (Array.isArray(this.items)) {
        var length = this.items.length;
        for (var index = 0; index < length && !stop; index += 1) {
          stop = fn(this.items[index], index, this.items) === false;
        }
      } else {
        var keys = Object.keys(this.items);
        var _length = keys.length;
        for (var _index = 0; _index < _length && !stop; _index += 1) {
          var key = keys[_index];
          stop = fn(this.items[key], key, this.items) === false;
        }
      }
      return this;
    };
  }
});
var require_eachSpread2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/eachSpread.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function eachSpread(fn) {
      this.each(function(values, key) {
        fn.apply(void 0, _toConsumableArray(values).concat([key]));
      });
      return this;
    };
  }
});
var require_every2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/every.js"(exports, module) {
    var values = require_values3();
    module.exports = function every(fn) {
      var items = values(this.items);
      return items.every(fn);
    };
  }
});
var require_variadic2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/variadic.js"(exports, module) {
    module.exports = function variadic(args) {
      if (Array.isArray(args[0])) {
        return args[0];
      }
      return args;
    };
  }
});
var require_except2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/except.js"(exports, module) {
    var variadic = require_variadic2();
    module.exports = function except() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      if (Array.isArray(this.items)) {
        var _collection = this.items.filter(function(item) {
          return properties.indexOf(item) === -1;
        });
        return new this.constructor(_collection);
      }
      var collection = {};
      Object.keys(this.items).forEach(function(property) {
        if (properties.indexOf(property) === -1) {
          collection[property] = _this.items[property];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_filter2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/filter.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function falsyValue(item) {
      if (Array.isArray(item)) {
        if (item.length) {
          return false;
        }
      } else if (item !== void 0 && item !== null && _typeof(item) === "object") {
        if (Object.keys(item).length) {
          return false;
        }
      } else if (item) {
        return false;
      }
      return true;
    }
    function filterObject(func, items) {
      var result = {};
      Object.keys(items).forEach(function(key) {
        if (func) {
          if (func(items[key], key)) {
            result[key] = items[key];
          }
        } else if (!falsyValue(items[key])) {
          result[key] = items[key];
        }
      });
      return result;
    }
    function filterArray(func, items) {
      if (func) {
        return items.filter(func);
      }
      var result = [];
      for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        if (!falsyValue(item)) {
          result.push(item);
        }
      }
      return result;
    }
    module.exports = function filter(fn) {
      var func = fn || false;
      var filteredItems = null;
      if (Array.isArray(this.items)) {
        filteredItems = filterArray(func, this.items);
      } else {
        filteredItems = filterObject(func, this.items);
      }
      return new this.constructor(filteredItems);
    };
  }
});
var require_first2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/first.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function first(fn, defaultValue) {
      if (isFunction(fn)) {
        var keys = Object.keys(this.items);
        for (var i = 0; i < keys.length; i += 1) {
          var key = keys[i];
          var item = this.items[key];
          if (fn(item, key)) {
            return item;
          }
        }
        if (isFunction(defaultValue)) {
          return defaultValue();
        }
        return defaultValue;
      }
      if (Array.isArray(this.items) && this.items.length || Object.keys(this.items).length) {
        if (Array.isArray(this.items)) {
          return this.items[0];
        }
        var firstKey = Object.keys(this.items)[0];
        return this.items[firstKey];
      }
      if (isFunction(defaultValue)) {
        return defaultValue();
      }
      return defaultValue;
    };
  }
});
var require_firstOrFail2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/firstOrFail.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function firstOrFail(key, operator, value) {
      if (isFunction(key)) {
        return this.first(key, function() {
          throw new Error("Item not found.");
        });
      }
      var collection = this.where(key, operator, value);
      if (collection.isEmpty()) {
        throw new Error("Item not found.");
      }
      return collection.first();
    };
  }
});
var require_firstWhere2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/firstWhere.js"(exports, module) {
    module.exports = function firstWhere(key, operator, value) {
      return this.where(key, operator, value).first() || null;
    };
  }
});
var require_flatMap2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flatMap.js"(exports, module) {
    module.exports = function flatMap(fn) {
      return this.map(fn).collapse();
    };
  }
});
var require_flatten2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flatten.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    module.exports = function flatten(depth) {
      var flattenDepth = depth || Infinity;
      var fullyFlattened = false;
      var collection = [];
      var flat = function flat2(items) {
        collection = [];
        if (isArray(items)) {
          items.forEach(function(item) {
            if (isArray(item)) {
              collection = collection.concat(item);
            } else if (isObject(item)) {
              Object.keys(item).forEach(function(property) {
                collection = collection.concat(item[property]);
              });
            } else {
              collection.push(item);
            }
          });
        } else {
          Object.keys(items).forEach(function(property) {
            if (isArray(items[property])) {
              collection = collection.concat(items[property]);
            } else if (isObject(items[property])) {
              Object.keys(items[property]).forEach(function(prop) {
                collection = collection.concat(items[property][prop]);
              });
            } else {
              collection.push(items[property]);
            }
          });
        }
        fullyFlattened = collection.filter(function(item) {
          return isObject(item);
        });
        fullyFlattened = fullyFlattened.length === 0;
        flattenDepth -= 1;
      };
      flat(this.items);
      while (!fullyFlattened && flattenDepth > 0) {
        flat(collection);
      }
      return new this.constructor(collection);
    };
  }
});
var require_flip2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/flip.js"(exports, module) {
    module.exports = function flip() {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        Object.keys(this.items).forEach(function(key) {
          collection[_this.items[key]] = Number(key);
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          collection[_this.items[key]] = key;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_forPage2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/forPage.js"(exports, module) {
    module.exports = function forPage(page, chunk) {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        collection = this.items.slice(page * chunk - chunk, page * chunk);
      } else {
        Object.keys(this.items).slice(page * chunk - chunk, page * chunk).forEach(function(key) {
          collection[key] = _this.items[key];
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_forget2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/forget.js"(exports, module) {
    module.exports = function forget(key) {
      if (Array.isArray(this.items)) {
        this.items.splice(key, 1);
      } else {
        delete this.items[key];
      }
      return this;
    };
  }
});
var require_get2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/get.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (this.items[key] !== void 0) {
        return this.items[key];
      }
      if (isFunction(defaultValue)) {
        return defaultValue();
      }
      if (defaultValue !== null) {
        return defaultValue;
      }
      return null;
    };
  }
});
var require_nestedValue2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/nestedValue.js"(exports, module) {
    module.exports = function nestedValue(mainObject, key) {
      try {
        return key.split(".").reduce(function(obj, property) {
          return obj[property];
        }, mainObject);
      } catch (err) {
        return mainObject;
      }
    };
  }
});
var require_groupBy2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/groupBy.js"(exports, module) {
    var nestedValue = require_nestedValue2();
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function groupBy(key) {
      var _this = this;
      var collection = {};
      this.items.forEach(function(item, index) {
        var resolvedKey;
        if (isFunction(key)) {
          resolvedKey = key(item, index);
        } else if (nestedValue(item, key) || nestedValue(item, key) === 0) {
          resolvedKey = nestedValue(item, key);
        } else {
          resolvedKey = "";
        }
        if (collection[resolvedKey] === void 0) {
          collection[resolvedKey] = new _this.constructor([]);
        }
        collection[resolvedKey].push(item);
      });
      return new this.constructor(collection);
    };
  }
});
var require_has2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/has.js"(exports, module) {
    var variadic = require_variadic2();
    module.exports = function has() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      return properties.filter(function(key) {
        return Object.hasOwnProperty.call(_this.items, key);
      }).length === properties.length;
    };
  }
});
var require_implode2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/implode.js"(exports, module) {
    module.exports = function implode(key, glue) {
      if (glue === void 0) {
        return this.items.join(key);
      }
      return new this.constructor(this.items).pluck(key).all().join(glue);
    };
  }
});
var require_intersect2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/intersect.js"(exports, module) {
    module.exports = function intersect(values) {
      var intersectValues = values;
      if (values instanceof this.constructor) {
        intersectValues = values.all();
      }
      var collection = this.items.filter(function(item) {
        return intersectValues.indexOf(item) !== -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_intersectByKeys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/intersectByKeys.js"(exports, module) {
    module.exports = function intersectByKeys(values) {
      var _this = this;
      var intersectKeys = Object.keys(values);
      if (values instanceof this.constructor) {
        intersectKeys = Object.keys(values.all());
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (intersectKeys.indexOf(key) !== -1) {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_isEmpty2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/isEmpty.js"(exports, module) {
    module.exports = function isEmpty() {
      if (Array.isArray(this.items)) {
        return !this.items.length;
      }
      return !Object.keys(this.items).length;
    };
  }
});
var require_isNotEmpty2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/isNotEmpty.js"(exports, module) {
    module.exports = function isNotEmpty() {
      return !this.isEmpty();
    };
  }
});
var require_join2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/join.js"(exports, module) {
    module.exports = function join(glue, finalGlue) {
      var collection = this.values();
      if (finalGlue === void 0) {
        return collection.implode(glue);
      }
      var count = collection.count();
      if (count === 0) {
        return "";
      }
      if (count === 1) {
        return collection.last();
      }
      var finalItem = collection.pop();
      return collection.implode(glue) + finalGlue + finalItem;
    };
  }
});
var require_keyBy2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/keyBy.js"(exports, module) {
    var nestedValue = require_nestedValue2();
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function keyBy(key) {
      var collection = {};
      if (isFunction(key)) {
        this.items.forEach(function(item) {
          collection[key(item)] = item;
        });
      } else {
        this.items.forEach(function(item) {
          var keyValue = nestedValue(item, key);
          collection[keyValue || ""] = item;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_keys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/keys.js"(exports, module) {
    module.exports = function keys() {
      var collection = Object.keys(this.items);
      if (Array.isArray(this.items)) {
        collection = collection.map(Number);
      }
      return new this.constructor(collection);
    };
  }
});
var require_last2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/last.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function last(fn, defaultValue) {
      var items = this.items;
      if (isFunction(fn)) {
        items = this.filter(fn).all();
      }
      if (Array.isArray(items) && !items.length || !Object.keys(items).length) {
        if (isFunction(defaultValue)) {
          return defaultValue();
        }
        return defaultValue;
      }
      if (Array.isArray(items)) {
        return items[items.length - 1];
      }
      var keys = Object.keys(items);
      return items[keys[keys.length - 1]];
    };
  }
});
var require_macro2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/macro.js"(exports, module) {
    module.exports = function macro(name, fn) {
      this.constructor.prototype[name] = fn;
    };
  }
});
var require_make2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/make.js"(exports, module) {
    module.exports = function make() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return new this.constructor(items);
    };
  }
});
var require_map2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/map.js"(exports, module) {
    module.exports = function map(fn) {
      var _this = this;
      if (Array.isArray(this.items)) {
        return new this.constructor(this.items.map(fn));
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        collection[key] = fn(_this.items[key], key);
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapSpread2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapSpread.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function mapSpread(fn) {
      return this.map(function(values, key) {
        return fn.apply(void 0, _toConsumableArray(values).concat([key]));
      });
    };
  }
});
var require_mapToDictionary2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapToDictionary.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapToDictionary(fn) {
      var collection = {};
      this.items.forEach(function(item, k) {
        var _fn = fn(item, k), _fn2 = _slicedToArray(_fn, 2), key = _fn2[0], value = _fn2[1];
        if (collection[key] === void 0) {
          collection[key] = [value];
        } else {
          collection[key].push(value);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapInto2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapInto.js"(exports, module) {
    module.exports = function mapInto(ClassName) {
      return this.map(function(value, key) {
        return new ClassName(value, key);
      });
    };
  }
});
var require_mapToGroups2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapToGroups.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapToGroups(fn) {
      var collection = {};
      this.items.forEach(function(item, key) {
        var _fn = fn(item, key), _fn2 = _slicedToArray(_fn, 2), keyed = _fn2[0], value = _fn2[1];
        if (collection[keyed] === void 0) {
          collection[keyed] = [value];
        } else {
          collection[keyed].push(value);
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_mapWithKeys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mapWithKeys.js"(exports, module) {
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    module.exports = function mapWithKeys(fn) {
      var _this = this;
      var collection = {};
      if (Array.isArray(this.items)) {
        this.items.forEach(function(item, index) {
          var _fn = fn(item, index), _fn2 = _slicedToArray(_fn, 2), keyed = _fn2[0], value = _fn2[1];
          collection[keyed] = value;
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          var _fn3 = fn(_this.items[key], key), _fn4 = _slicedToArray(_fn3, 2), keyed = _fn4[0], value = _fn4[1];
          collection[keyed] = value;
        });
      }
      return new this.constructor(collection);
    };
  }
});
var require_max2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/max.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function max(key) {
      if (typeof key === "string") {
        var filtered = this.items.filter(function(item) {
          return item[key] !== void 0;
        });
        return Math.max.apply(Math, _toConsumableArray(filtered.map(function(item) {
          return item[key];
        })));
      }
      return Math.max.apply(Math, _toConsumableArray(this.items));
    };
  }
});
var require_median2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/median.js"(exports, module) {
    module.exports = function median(key) {
      var length = this.items.length;
      if (key === void 0) {
        if (length % 2 === 0) {
          return (this.items[length / 2 - 1] + this.items[length / 2]) / 2;
        }
        return this.items[Math.floor(length / 2)];
      }
      if (length % 2 === 0) {
        return (this.items[length / 2 - 1][key] + this.items[length / 2][key]) / 2;
      }
      return this.items[Math.floor(length / 2)][key];
    };
  }
});
var require_merge2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/merge.js"(exports, module) {
    module.exports = function merge(value) {
      var arrayOrObject = value;
      if (typeof arrayOrObject === "string") {
        arrayOrObject = [arrayOrObject];
      }
      if (Array.isArray(this.items) && Array.isArray(arrayOrObject)) {
        return new this.constructor(this.items.concat(arrayOrObject));
      }
      var collection = JSON.parse(JSON.stringify(this.items));
      Object.keys(arrayOrObject).forEach(function(key) {
        collection[key] = arrayOrObject[key];
      });
      return new this.constructor(collection);
    };
  }
});
var require_mergeRecursive2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mergeRecursive.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function mergeRecursive(items) {
      var merge = function merge2(target, source) {
        var merged = {};
        var mergedKeys = Object.keys(_objectSpread(_objectSpread({}, target), source));
        mergedKeys.forEach(function(key) {
          if (target[key] === void 0 && source[key] !== void 0) {
            merged[key] = source[key];
          } else if (target[key] !== void 0 && source[key] === void 0) {
            merged[key] = target[key];
          } else if (target[key] !== void 0 && source[key] !== void 0) {
            if (target[key] === source[key]) {
              merged[key] = target[key];
            } else if (!Array.isArray(target[key]) && _typeof(target[key]) === "object" && !Array.isArray(source[key]) && _typeof(source[key]) === "object") {
              merged[key] = merge2(target[key], source[key]);
            } else {
              merged[key] = [].concat(target[key], source[key]);
            }
          }
        });
        return merged;
      };
      if (!items) {
        return this;
      }
      if (items.constructor.name === "Collection") {
        return new this.constructor(merge(this.items, items.all()));
      }
      return new this.constructor(merge(this.items, items));
    };
  }
});
var require_min2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/min.js"(exports, module) {
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    module.exports = function min(key) {
      if (key !== void 0) {
        var filtered = this.items.filter(function(item) {
          return item[key] !== void 0;
        });
        return Math.min.apply(Math, _toConsumableArray(filtered.map(function(item) {
          return item[key];
        })));
      }
      return Math.min.apply(Math, _toConsumableArray(this.items));
    };
  }
});
var require_mode2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/mode.js"(exports, module) {
    module.exports = function mode(key) {
      var values = [];
      var highestCount = 1;
      if (!this.items.length) {
        return null;
      }
      this.items.forEach(function(item) {
        var tempValues = values.filter(function(value) {
          if (key !== void 0) {
            return value.key === item[key];
          }
          return value.key === item;
        });
        if (!tempValues.length) {
          if (key !== void 0) {
            values.push({
              key: item[key],
              count: 1
            });
          } else {
            values.push({
              key: item,
              count: 1
            });
          }
        } else {
          tempValues[0].count += 1;
          var count = tempValues[0].count;
          if (count > highestCount) {
            highestCount = count;
          }
        }
      });
      return values.filter(function(value) {
        return value.count === highestCount;
      }).map(function(value) {
        return value.key;
      });
    };
  }
});
var require_nth2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/nth.js"(exports, module) {
    var values = require_values3();
    module.exports = function nth(n) {
      var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var items = values(this.items);
      var collection = items.slice(offset).filter(function(item, index) {
        return index % n === 0;
      });
      return new this.constructor(collection);
    };
  }
});
var require_only2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/only.js"(exports, module) {
    var variadic = require_variadic2();
    module.exports = function only() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var properties = variadic(args);
      if (Array.isArray(this.items)) {
        var _collection = this.items.filter(function(item) {
          return properties.indexOf(item) !== -1;
        });
        return new this.constructor(_collection);
      }
      var collection = {};
      Object.keys(this.items).forEach(function(prop) {
        if (properties.indexOf(prop) !== -1) {
          collection[prop] = _this.items[prop];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_pad2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pad.js"(exports, module) {
    var clone = require_clone2();
    module.exports = function pad(size, value) {
      var abs = Math.abs(size);
      var count = this.count();
      if (abs <= count) {
        return this;
      }
      var diff = abs - count;
      var items = clone(this.items);
      var isArray = Array.isArray(this.items);
      var prepend = size < 0;
      for (var iterator = 0; iterator < diff; ) {
        if (!isArray) {
          if (items[iterator] !== void 0) {
            diff += 1;
          } else {
            items[iterator] = value;
          }
        } else if (prepend) {
          items.unshift(value);
        } else {
          items.push(value);
        }
        iterator += 1;
      }
      return new this.constructor(items);
    };
  }
});
var require_partition2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/partition.js"(exports, module) {
    module.exports = function partition(fn) {
      var _this = this;
      var arrays;
      if (Array.isArray(this.items)) {
        arrays = [new this.constructor([]), new this.constructor([])];
        this.items.forEach(function(item) {
          if (fn(item) === true) {
            arrays[0].push(item);
          } else {
            arrays[1].push(item);
          }
        });
      } else {
        arrays = [new this.constructor({}), new this.constructor({})];
        Object.keys(this.items).forEach(function(prop) {
          var value = _this.items[prop];
          if (fn(value) === true) {
            arrays[0].put(prop, value);
          } else {
            arrays[1].put(prop, value);
          }
        });
      }
      return new this.constructor(arrays);
    };
  }
});
var require_pipe2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pipe.js"(exports, module) {
    module.exports = function pipe(fn) {
      return fn(this);
    };
  }
});
var require_pluck2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pluck.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var nestedValue = require_nestedValue2();
    var buildKeyPathMap = function buildKeyPathMap2(items) {
      var keyPaths = {};
      items.forEach(function(item, index) {
        function buildKeyPath(val, keyPath) {
          if (isObject(val)) {
            Object.keys(val).forEach(function(prop) {
              buildKeyPath(val[prop], "".concat(keyPath, ".").concat(prop));
            });
          } else if (isArray(val)) {
            val.forEach(function(v, i) {
              buildKeyPath(v, "".concat(keyPath, ".").concat(i));
            });
          }
          keyPaths[keyPath] = val;
        }
        buildKeyPath(item, index);
      });
      return keyPaths;
    };
    module.exports = function pluck(value, key) {
      if (value.indexOf("*") !== -1) {
        var keyPathMap = buildKeyPathMap(this.items);
        var keyMatches = [];
        if (key !== void 0) {
          var keyRegex = new RegExp("0.".concat(key), "g");
          var keyNumberOfLevels = "0.".concat(key).split(".").length;
          Object.keys(keyPathMap).forEach(function(k) {
            var matchingKey = k.match(keyRegex);
            if (matchingKey) {
              var match = matchingKey[0];
              if (match.split(".").length === keyNumberOfLevels) {
                keyMatches.push(keyPathMap[match]);
              }
            }
          });
        }
        var valueMatches = [];
        var valueRegex = new RegExp("0.".concat(value), "g");
        var valueNumberOfLevels = "0.".concat(value).split(".").length;
        Object.keys(keyPathMap).forEach(function(k) {
          var matchingValue = k.match(valueRegex);
          if (matchingValue) {
            var match = matchingValue[0];
            if (match.split(".").length === valueNumberOfLevels) {
              valueMatches.push(keyPathMap[match]);
            }
          }
        });
        if (key !== void 0) {
          var collection = {};
          this.items.forEach(function(item, index) {
            collection[keyMatches[index] || ""] = valueMatches;
          });
          return new this.constructor(collection);
        }
        return new this.constructor([valueMatches]);
      }
      if (key !== void 0) {
        var _collection = {};
        this.items.forEach(function(item) {
          if (nestedValue(item, value) !== void 0) {
            _collection[item[key] || ""] = nestedValue(item, value);
          } else {
            _collection[item[key] || ""] = null;
          }
        });
        return new this.constructor(_collection);
      }
      return this.map(function(item) {
        if (nestedValue(item, value) !== void 0) {
          return nestedValue(item, value);
        }
        return null;
      });
    };
  }
});
var require_deleteKeys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/helpers/deleteKeys.js"(exports, module) {
    var variadic = require_variadic2();
    module.exports = function deleteKeys(obj) {
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }
      variadic(keys).forEach(function(key) {
        delete obj[key];
      });
    };
  }
});
var require_pop2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pop.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var deleteKeys = require_deleteKeys2();
    module.exports = function pop() {
      var _this = this;
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      if (this.isEmpty()) {
        return null;
      }
      if (isArray(this.items)) {
        if (count === 1) {
          return this.items.pop();
        }
        return new this.constructor(this.items.splice(-count));
      }
      if (isObject(this.items)) {
        var keys = Object.keys(this.items);
        if (count === 1) {
          var key = keys[keys.length - 1];
          var last = this.items[key];
          deleteKeys(this.items, key);
          return last;
        }
        var poppedKeys = keys.slice(-count);
        var newObject = poppedKeys.reduce(function(acc, current) {
          acc[current] = _this.items[current];
          return acc;
        }, {});
        deleteKeys(this.items, poppedKeys);
        return new this.constructor(newObject);
      }
      return null;
    };
  }
});
var require_prepend2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/prepend.js"(exports, module) {
    module.exports = function prepend(value, key) {
      if (key !== void 0) {
        return this.put(key, value);
      }
      this.items.unshift(value);
      return this;
    };
  }
});
var require_pull2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/pull.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function pull(key, defaultValue) {
      var returnValue = this.items[key] || null;
      if (!returnValue && defaultValue !== void 0) {
        if (isFunction(defaultValue)) {
          returnValue = defaultValue();
        } else {
          returnValue = defaultValue;
        }
      }
      delete this.items[key];
      return returnValue;
    };
  }
});
var require_push2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/push.js"(exports, module) {
    module.exports = function push() {
      var _this$items;
      (_this$items = this.items).push.apply(_this$items, arguments);
      return this;
    };
  }
});
var require_put2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/put.js"(exports, module) {
    module.exports = function put(key, value) {
      this.items[key] = value;
      return this;
    };
  }
});
var require_random2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/random.js"(exports, module) {
    var values = require_values3();
    module.exports = function random() {
      var length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      var items = values(this.items);
      var collection = new this.constructor(items).shuffle();
      if (length !== parseInt(length, 10)) {
        return collection.first();
      }
      return collection.take(length);
    };
  }
});
var require_reduce2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reduce.js"(exports, module) {
    module.exports = function reduce(fn, carry) {
      var _this = this;
      var reduceCarry = null;
      if (carry !== void 0) {
        reduceCarry = carry;
      }
      if (Array.isArray(this.items)) {
        this.items.forEach(function(item) {
          reduceCarry = fn(reduceCarry, item);
        });
      } else {
        Object.keys(this.items).forEach(function(key) {
          reduceCarry = fn(reduceCarry, _this.items[key], key);
        });
      }
      return reduceCarry;
    };
  }
});
var require_reject2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reject.js"(exports, module) {
    module.exports = function reject(fn) {
      return new this.constructor(this.items).filter(function(item) {
        return !fn(item);
      });
    };
  }
});
var require_replace2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/replace.js"(exports, module) {
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function replace(items) {
      if (!items) {
        return this;
      }
      if (Array.isArray(items)) {
        var _replaced = this.items.map(function(value, index) {
          return items[index] || value;
        });
        return new this.constructor(_replaced);
      }
      if (items.constructor.name === "Collection") {
        var _replaced2 = _objectSpread(_objectSpread({}, this.items), items.all());
        return new this.constructor(_replaced2);
      }
      var replaced = _objectSpread(_objectSpread({}, this.items), items);
      return new this.constructor(replaced);
    };
  }
});
var require_replaceRecursive2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/replaceRecursive.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function replaceRecursive(items) {
      var replace = function replace2(target, source) {
        var replaced = _objectSpread({}, target);
        var mergedKeys = Object.keys(_objectSpread(_objectSpread({}, target), source));
        mergedKeys.forEach(function(key) {
          if (!Array.isArray(source[key]) && _typeof(source[key]) === "object") {
            replaced[key] = replace2(target[key], source[key]);
          } else if (target[key] === void 0 && source[key] !== void 0) {
            if (_typeof(target[key]) === "object") {
              replaced[key] = _objectSpread({}, source[key]);
            } else {
              replaced[key] = source[key];
            }
          } else if (target[key] !== void 0 && source[key] === void 0) {
            if (_typeof(target[key]) === "object") {
              replaced[key] = _objectSpread({}, target[key]);
            } else {
              replaced[key] = target[key];
            }
          } else if (target[key] !== void 0 && source[key] !== void 0) {
            if (_typeof(source[key]) === "object") {
              replaced[key] = _objectSpread({}, source[key]);
            } else {
              replaced[key] = source[key];
            }
          }
        });
        return replaced;
      };
      if (!items) {
        return this;
      }
      if (!Array.isArray(items) && _typeof(items) !== "object") {
        return new this.constructor(replace(this.items, [items]));
      }
      if (items.constructor.name === "Collection") {
        return new this.constructor(replace(this.items, items.all()));
      }
      return new this.constructor(replace(this.items, items));
    };
  }
});
var require_reverse2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/reverse.js"(exports, module) {
    module.exports = function reverse() {
      var collection = [].concat(this.items).reverse();
      return new this.constructor(collection);
    };
  }
});
var require_search2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/search.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function search(valueOrFunction, strict) {
      var _this = this;
      var result;
      var find = function find2(item, key) {
        if (isFunction(valueOrFunction)) {
          return valueOrFunction(_this.items[key], key);
        }
        if (strict) {
          return _this.items[key] === valueOrFunction;
        }
        return _this.items[key] == valueOrFunction;
      };
      if (isArray(this.items)) {
        result = this.items.findIndex(find);
      } else if (isObject(this.items)) {
        result = Object.keys(this.items).find(function(key) {
          return find(_this.items[key], key);
        });
      }
      if (result === void 0 || result < 0) {
        return false;
      }
      return result;
    };
  }
});
var require_shift2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/shift.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var deleteKeys = require_deleteKeys2();
    module.exports = function shift() {
      var _this = this;
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      if (this.isEmpty()) {
        return null;
      }
      if (isArray(this.items)) {
        if (count === 1) {
          return this.items.shift();
        }
        return new this.constructor(this.items.splice(0, count));
      }
      if (isObject(this.items)) {
        if (count === 1) {
          var key = Object.keys(this.items)[0];
          var value = this.items[key];
          delete this.items[key];
          return value;
        }
        var keys = Object.keys(this.items);
        var poppedKeys = keys.slice(0, count);
        var newObject = poppedKeys.reduce(function(acc, current) {
          acc[current] = _this.items[current];
          return acc;
        }, {});
        deleteKeys(this.items, poppedKeys);
        return new this.constructor(newObject);
      }
      return null;
    };
  }
});
var require_shuffle2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/shuffle.js"(exports, module) {
    var values = require_values3();
    module.exports = function shuffle() {
      var items = values(this.items);
      var j;
      var x;
      var i;
      for (i = items.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = items[i - 1];
        items[i - 1] = items[j];
        items[j] = x;
      }
      this.items = items;
      return this;
    };
  }
});
var require_skip2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skip.js"(exports, module) {
    var _require = require_is2();
    var isObject = _require.isObject;
    module.exports = function skip(number) {
      var _this = this;
      if (isObject(this.items)) {
        return new this.constructor(Object.keys(this.items).reduce(function(accumulator, key, index) {
          if (index + 1 > number) {
            accumulator[key] = _this.items[key];
          }
          return accumulator;
        }, {}));
      }
      return new this.constructor(this.items.slice(number));
    };
  }
});
var require_skipUntil2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skipUntil.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function skipUntil(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== true) {
            previous = callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== true) {
            previous = callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_skipWhile2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/skipWhile.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function skipWhile(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== true) {
            previous = !callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== true) {
            previous = !callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_slice2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/slice.js"(exports, module) {
    module.exports = function slice(remove, limit) {
      var collection = this.items.slice(remove);
      if (limit !== void 0) {
        collection = collection.slice(0, limit);
      }
      return new this.constructor(collection);
    };
  }
});
var require_sole2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sole.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function sole(key, operator, value) {
      var collection;
      if (isFunction(key)) {
        collection = this.filter(key);
      } else {
        collection = this.where(key, operator, value);
      }
      if (collection.isEmpty()) {
        throw new Error("Item not found.");
      }
      if (collection.count() > 1) {
        throw new Error("Multiple items found.");
      }
      return collection.first();
    };
  }
});
var require_some2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/some.js"(exports, module) {
    var contains = require_contains2();
    module.exports = contains;
  }
});
var require_sort2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sort.js"(exports, module) {
    module.exports = function sort(fn) {
      var collection = [].concat(this.items);
      if (fn === void 0) {
        if (this.every(function(item) {
          return typeof item === "number";
        })) {
          collection.sort(function(a, b) {
            return a - b;
          });
        } else {
          collection.sort();
        }
      } else {
        collection.sort(fn);
      }
      return new this.constructor(collection);
    };
  }
});
var require_sortDesc2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortDesc.js"(exports, module) {
    module.exports = function sortDesc() {
      return this.sort().reverse();
    };
  }
});
var require_sortBy2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortBy.js"(exports, module) {
    var nestedValue = require_nestedValue2();
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function sortBy(valueOrFunction) {
      var collection = [].concat(this.items);
      var getValue = function getValue2(item) {
        if (isFunction(valueOrFunction)) {
          return valueOrFunction(item);
        }
        return nestedValue(item, valueOrFunction);
      };
      collection.sort(function(a, b) {
        var valueA = getValue(a);
        var valueB = getValue(b);
        if (valueA === null || valueA === void 0) {
          return 1;
        }
        if (valueB === null || valueB === void 0) {
          return -1;
        }
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
      return new this.constructor(collection);
    };
  }
});
var require_sortByDesc2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortByDesc.js"(exports, module) {
    module.exports = function sortByDesc(valueOrFunction) {
      return this.sortBy(valueOrFunction).reverse();
    };
  }
});
var require_sortKeys2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortKeys.js"(exports, module) {
    module.exports = function sortKeys() {
      var _this = this;
      var ordered = {};
      Object.keys(this.items).sort().forEach(function(key) {
        ordered[key] = _this.items[key];
      });
      return new this.constructor(ordered);
    };
  }
});
var require_sortKeysDesc2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sortKeysDesc.js"(exports, module) {
    module.exports = function sortKeysDesc() {
      var _this = this;
      var ordered = {};
      Object.keys(this.items).sort().reverse().forEach(function(key) {
        ordered[key] = _this.items[key];
      });
      return new this.constructor(ordered);
    };
  }
});
var require_splice2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/splice.js"(exports, module) {
    module.exports = function splice(index, limit, replace) {
      var slicedCollection = this.slice(index, limit);
      this.items = this.diff(slicedCollection.all()).all();
      if (Array.isArray(replace)) {
        for (var iterator = 0, length = replace.length; iterator < length; iterator += 1) {
          this.items.splice(index + iterator, 0, replace[iterator]);
        }
      }
      return slicedCollection;
    };
  }
});
var require_split2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/split.js"(exports, module) {
    module.exports = function split(numberOfGroups) {
      var itemsPerGroup = Math.round(this.items.length / numberOfGroups);
      var items = JSON.parse(JSON.stringify(this.items));
      var collection = [];
      for (var iterator = 0; iterator < numberOfGroups; iterator += 1) {
        collection.push(new this.constructor(items.splice(0, itemsPerGroup)));
      }
      return new this.constructor(collection);
    };
  }
});
var require_sum2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/sum.js"(exports, module) {
    var values = require_values3();
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function sum(key) {
      var items = values(this.items);
      var total = 0;
      if (key === void 0) {
        for (var i = 0, length = items.length; i < length; i += 1) {
          total += parseFloat(items[i]);
        }
      } else if (isFunction(key)) {
        for (var _i = 0, _length = items.length; _i < _length; _i += 1) {
          total += parseFloat(key(items[_i]));
        }
      } else {
        for (var _i2 = 0, _length2 = items.length; _i2 < _length2; _i2 += 1) {
          total += parseFloat(items[_i2][key]);
        }
      }
      return parseFloat(total.toPrecision(12));
    };
  }
});
var require_take2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/take.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function take(length) {
      var _this = this;
      if (!Array.isArray(this.items) && _typeof(this.items) === "object") {
        var keys = Object.keys(this.items);
        var slicedKeys;
        if (length < 0) {
          slicedKeys = keys.slice(length);
        } else {
          slicedKeys = keys.slice(0, length);
        }
        var collection = {};
        keys.forEach(function(prop) {
          if (slicedKeys.indexOf(prop) !== -1) {
            collection[prop] = _this.items[prop];
          }
        });
        return new this.constructor(collection);
      }
      if (length < 0) {
        return new this.constructor(this.items.slice(length));
      }
      return new this.constructor(this.items.slice(0, length));
    };
  }
});
var require_takeUntil2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/takeUntil.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function takeUntil(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== false) {
            previous = !callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== false) {
            previous = !callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_takeWhile2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/takeWhile.js"(exports, module) {
    var _require = require_is2();
    var isArray = _require.isArray;
    var isObject = _require.isObject;
    var isFunction = _require.isFunction;
    module.exports = function takeWhile(valueOrFunction) {
      var _this = this;
      var previous = null;
      var items;
      var callback = function callback2(value) {
        return value === valueOrFunction;
      };
      if (isFunction(valueOrFunction)) {
        callback = valueOrFunction;
      }
      if (isArray(this.items)) {
        items = this.items.filter(function(item) {
          if (previous !== false) {
            previous = callback(item);
          }
          return previous;
        });
      }
      if (isObject(this.items)) {
        items = Object.keys(this.items).reduce(function(acc, key) {
          if (previous !== false) {
            previous = callback(_this.items[key]);
          }
          if (previous !== false) {
            acc[key] = _this.items[key];
          }
          return acc;
        }, {});
      }
      return new this.constructor(items);
    };
  }
});
var require_tap2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/tap.js"(exports, module) {
    module.exports = function tap(fn) {
      fn(this);
      return this;
    };
  }
});
var require_times2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/times.js"(exports, module) {
    module.exports = function times(n, fn) {
      for (var iterator = 1; iterator <= n; iterator += 1) {
        this.items.push(fn(iterator));
      }
      return this;
    };
  }
});
var require_toArray2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/toArray.js"(exports, module) {
    module.exports = function toArray() {
      var collectionInstance = this.constructor;
      function iterate(list, collection2) {
        var childCollection = [];
        if (list instanceof collectionInstance) {
          list.items.forEach(function(i) {
            return iterate(i, childCollection);
          });
          collection2.push(childCollection);
        } else if (Array.isArray(list)) {
          list.forEach(function(i) {
            return iterate(i, childCollection);
          });
          collection2.push(childCollection);
        } else {
          collection2.push(list);
        }
      }
      if (Array.isArray(this.items)) {
        var collection = [];
        this.items.forEach(function(items) {
          iterate(items, collection);
        });
        return collection;
      }
      return this.values().all();
    };
  }
});
var require_toJson2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/toJson.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function toJson() {
      if (_typeof(this.items) === "object" && !Array.isArray(this.items)) {
        return JSON.stringify(this.all());
      }
      return JSON.stringify(this.toArray());
    };
  }
});
var require_transform2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/transform.js"(exports, module) {
    module.exports = function transform(fn) {
      var _this = this;
      if (Array.isArray(this.items)) {
        this.items = this.items.map(fn);
      } else {
        var collection = {};
        Object.keys(this.items).forEach(function(key) {
          collection[key] = fn(_this.items[key], key);
        });
        this.items = collection;
      }
      return this;
    };
  }
});
var require_undot2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/undot.js"(exports, module) {
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module.exports = function undot() {
      var _this = this;
      if (Array.isArray(this.items)) {
        return this;
      }
      var collection = {};
      Object.keys(this.items).forEach(function(key) {
        if (key.indexOf(".") !== -1) {
          var obj = collection;
          key.split(".").reduce(function(acc, current, index, array) {
            if (!acc[current]) {
              acc[current] = {};
            }
            if (index === array.length - 1) {
              acc[current] = _this.items[key];
            }
            return acc[current];
          }, obj);
          collection = _objectSpread(_objectSpread({}, collection), obj);
        } else {
          collection[key] = _this.items[key];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_unless2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unless.js"(exports, module) {
    module.exports = function when(value, fn, defaultFn) {
      if (!value) {
        fn(this);
      } else {
        defaultFn(this);
      }
    };
  }
});
var require_whenNotEmpty2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whenNotEmpty.js"(exports, module) {
    module.exports = function whenNotEmpty(fn, defaultFn) {
      if (Array.isArray(this.items) && this.items.length) {
        return fn(this);
      }
      if (Object.keys(this.items).length) {
        return fn(this);
      }
      if (defaultFn !== void 0) {
        if (Array.isArray(this.items) && !this.items.length) {
          return defaultFn(this);
        }
        if (!Object.keys(this.items).length) {
          return defaultFn(this);
        }
      }
      return this;
    };
  }
});
var require_whenEmpty2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whenEmpty.js"(exports, module) {
    module.exports = function whenEmpty(fn, defaultFn) {
      if (Array.isArray(this.items) && !this.items.length) {
        return fn(this);
      }
      if (!Object.keys(this.items).length) {
        return fn(this);
      }
      if (defaultFn !== void 0) {
        if (Array.isArray(this.items) && this.items.length) {
          return defaultFn(this);
        }
        if (Object.keys(this.items).length) {
          return defaultFn(this);
        }
      }
      return this;
    };
  }
});
var require_union2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/union.js"(exports, module) {
    module.exports = function union(object) {
      var _this = this;
      var collection = JSON.parse(JSON.stringify(this.items));
      Object.keys(object).forEach(function(prop) {
        if (_this.items[prop] === void 0) {
          collection[prop] = object[prop];
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_unique2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unique.js"(exports, module) {
    var _require = require_is2();
    var isFunction = _require.isFunction;
    module.exports = function unique(key) {
      var collection;
      if (key === void 0) {
        collection = this.items.filter(function(element, index, self2) {
          return self2.indexOf(element) === index;
        });
      } else {
        collection = [];
        var usedKeys = [];
        for (var iterator = 0, length = this.items.length; iterator < length; iterator += 1) {
          var uniqueKey = void 0;
          if (isFunction(key)) {
            uniqueKey = key(this.items[iterator]);
          } else {
            uniqueKey = this.items[iterator][key];
          }
          if (usedKeys.indexOf(uniqueKey) === -1) {
            collection.push(this.items[iterator]);
            usedKeys.push(uniqueKey);
          }
        }
      }
      return new this.constructor(collection);
    };
  }
});
var require_unwrap2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/unwrap.js"(exports, module) {
    module.exports = function unwrap(value) {
      if (value instanceof this.constructor) {
        return value.all();
      }
      return value;
    };
  }
});
var require_values22 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/values.js"(exports, module) {
    var getValues = require_values3();
    module.exports = function values() {
      return new this.constructor(getValues(this.items));
    };
  }
});
var require_when2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/when.js"(exports, module) {
    module.exports = function when(value, fn, defaultFn) {
      if (value) {
        return fn(this, value);
      }
      if (defaultFn) {
        return defaultFn(this, value);
      }
      return this;
    };
  }
});
var require_where2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/where.js"(exports, module) {
    var values = require_values3();
    var nestedValue = require_nestedValue2();
    module.exports = function where(key, operator, value) {
      var comparisonOperator = operator;
      var comparisonValue = value;
      var items = values(this.items);
      if (operator === void 0 || operator === true) {
        return new this.constructor(items.filter(function(item) {
          return nestedValue(item, key);
        }));
      }
      if (operator === false) {
        return new this.constructor(items.filter(function(item) {
          return !nestedValue(item, key);
        }));
      }
      if (value === void 0) {
        comparisonValue = operator;
        comparisonOperator = "===";
      }
      var collection = items.filter(function(item) {
        switch (comparisonOperator) {
          case "==":
            return nestedValue(item, key) === Number(comparisonValue) || nestedValue(item, key) === comparisonValue.toString();
          default:
          case "===":
            return nestedValue(item, key) === comparisonValue;
          case "!=":
          case "<>":
            return nestedValue(item, key) !== Number(comparisonValue) && nestedValue(item, key) !== comparisonValue.toString();
          case "!==":
            return nestedValue(item, key) !== comparisonValue;
          case "<":
            return nestedValue(item, key) < comparisonValue;
          case "<=":
            return nestedValue(item, key) <= comparisonValue;
          case ">":
            return nestedValue(item, key) > comparisonValue;
          case ">=":
            return nestedValue(item, key) >= comparisonValue;
        }
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereBetween2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereBetween.js"(exports, module) {
    module.exports = function whereBetween(key, values) {
      return this.where(key, ">=", values[0]).where(key, "<=", values[values.length - 1]);
    };
  }
});
var require_whereIn2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereIn.js"(exports, module) {
    var extractValues = require_values3();
    var nestedValue = require_nestedValue2();
    module.exports = function whereIn(key, values) {
      var items = extractValues(values);
      var collection = this.items.filter(function(item) {
        return items.indexOf(nestedValue(item, key)) !== -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereInstanceOf2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereInstanceOf.js"(exports, module) {
    module.exports = function whereInstanceOf(type) {
      return this.filter(function(item) {
        return item instanceof type;
      });
    };
  }
});
var require_whereNotBetween2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotBetween.js"(exports, module) {
    var nestedValue = require_nestedValue2();
    module.exports = function whereNotBetween(key, values) {
      return this.filter(function(item) {
        return nestedValue(item, key) < values[0] || nestedValue(item, key) > values[values.length - 1];
      });
    };
  }
});
var require_whereNotIn2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotIn.js"(exports, module) {
    var extractValues = require_values3();
    var nestedValue = require_nestedValue2();
    module.exports = function whereNotIn(key, values) {
      var items = extractValues(values);
      var collection = this.items.filter(function(item) {
        return items.indexOf(nestedValue(item, key)) === -1;
      });
      return new this.constructor(collection);
    };
  }
});
var require_whereNull2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNull.js"(exports, module) {
    module.exports = function whereNull() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return this.where(key, "===", null);
    };
  }
});
var require_whereNotNull2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/whereNotNull.js"(exports, module) {
    module.exports = function whereNotNull() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return this.where(key, "!==", null);
    };
  }
});
var require_wrap2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/wrap.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    module.exports = function wrap(value) {
      if (value instanceof this.constructor) {
        return value;
      }
      if (_typeof(value) === "object") {
        return new this.constructor(value);
      }
      return new this.constructor([value]);
    };
  }
});
var require_zip2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/methods/zip.js"(exports, module) {
    module.exports = function zip(array) {
      var _this = this;
      var values = array;
      if (values instanceof this.constructor) {
        values = values.all();
      }
      var collection = this.items.map(function(item, index) {
        return new _this.constructor([item, values[index]]);
      });
      return new this.constructor(collection);
    };
  }
});
var require_dist2 = __commonJS3({
  "node_modules/.pnpm/collect.js@4.36.1/node_modules/collect.js/dist/index.js"(exports, module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function Collection(collection) {
      if (collection !== void 0 && !Array.isArray(collection) && _typeof(collection) !== "object") {
        this.items = [collection];
      } else if (collection instanceof this.constructor) {
        this.items = collection.all();
      } else {
        this.items = collection || [];
      }
    }
    var SymbolIterator = require_symbol_iterator2();
    if (typeof Symbol !== "undefined") {
      Collection.prototype[Symbol.iterator] = SymbolIterator;
    }
    Collection.prototype.toJSON = function toJSON() {
      return this.items;
    };
    Collection.prototype.all = require_all2();
    Collection.prototype.average = require_average2();
    Collection.prototype.avg = require_avg2();
    Collection.prototype.chunk = require_chunk2();
    Collection.prototype.collapse = require_collapse2();
    Collection.prototype.combine = require_combine2();
    Collection.prototype.concat = require_concat2();
    Collection.prototype.contains = require_contains2();
    Collection.prototype.containsOneItem = require_containsOneItem2();
    Collection.prototype.count = require_count2();
    Collection.prototype.countBy = require_countBy2();
    Collection.prototype.crossJoin = require_crossJoin2();
    Collection.prototype.dd = require_dd2();
    Collection.prototype.diff = require_diff2();
    Collection.prototype.diffAssoc = require_diffAssoc2();
    Collection.prototype.diffKeys = require_diffKeys2();
    Collection.prototype.diffUsing = require_diffUsing2();
    Collection.prototype.doesntContain = require_doesntContain2();
    Collection.prototype.dump = require_dump2();
    Collection.prototype.duplicates = require_duplicates2();
    Collection.prototype.each = require_each2();
    Collection.prototype.eachSpread = require_eachSpread2();
    Collection.prototype.every = require_every2();
    Collection.prototype.except = require_except2();
    Collection.prototype.filter = require_filter2();
    Collection.prototype.first = require_first2();
    Collection.prototype.firstOrFail = require_firstOrFail2();
    Collection.prototype.firstWhere = require_firstWhere2();
    Collection.prototype.flatMap = require_flatMap2();
    Collection.prototype.flatten = require_flatten2();
    Collection.prototype.flip = require_flip2();
    Collection.prototype.forPage = require_forPage2();
    Collection.prototype.forget = require_forget2();
    Collection.prototype.get = require_get2();
    Collection.prototype.groupBy = require_groupBy2();
    Collection.prototype.has = require_has2();
    Collection.prototype.implode = require_implode2();
    Collection.prototype.intersect = require_intersect2();
    Collection.prototype.intersectByKeys = require_intersectByKeys2();
    Collection.prototype.isEmpty = require_isEmpty2();
    Collection.prototype.isNotEmpty = require_isNotEmpty2();
    Collection.prototype.join = require_join2();
    Collection.prototype.keyBy = require_keyBy2();
    Collection.prototype.keys = require_keys2();
    Collection.prototype.last = require_last2();
    Collection.prototype.macro = require_macro2();
    Collection.prototype.make = require_make2();
    Collection.prototype.map = require_map2();
    Collection.prototype.mapSpread = require_mapSpread2();
    Collection.prototype.mapToDictionary = require_mapToDictionary2();
    Collection.prototype.mapInto = require_mapInto2();
    Collection.prototype.mapToGroups = require_mapToGroups2();
    Collection.prototype.mapWithKeys = require_mapWithKeys2();
    Collection.prototype.max = require_max2();
    Collection.prototype.median = require_median2();
    Collection.prototype.merge = require_merge2();
    Collection.prototype.mergeRecursive = require_mergeRecursive2();
    Collection.prototype.min = require_min2();
    Collection.prototype.mode = require_mode2();
    Collection.prototype.nth = require_nth2();
    Collection.prototype.only = require_only2();
    Collection.prototype.pad = require_pad2();
    Collection.prototype.partition = require_partition2();
    Collection.prototype.pipe = require_pipe2();
    Collection.prototype.pluck = require_pluck2();
    Collection.prototype.pop = require_pop2();
    Collection.prototype.prepend = require_prepend2();
    Collection.prototype.pull = require_pull2();
    Collection.prototype.push = require_push2();
    Collection.prototype.put = require_put2();
    Collection.prototype.random = require_random2();
    Collection.prototype.reduce = require_reduce2();
    Collection.prototype.reject = require_reject2();
    Collection.prototype.replace = require_replace2();
    Collection.prototype.replaceRecursive = require_replaceRecursive2();
    Collection.prototype.reverse = require_reverse2();
    Collection.prototype.search = require_search2();
    Collection.prototype.shift = require_shift2();
    Collection.prototype.shuffle = require_shuffle2();
    Collection.prototype.skip = require_skip2();
    Collection.prototype.skipUntil = require_skipUntil2();
    Collection.prototype.skipWhile = require_skipWhile2();
    Collection.prototype.slice = require_slice2();
    Collection.prototype.sole = require_sole2();
    Collection.prototype.some = require_some2();
    Collection.prototype.sort = require_sort2();
    Collection.prototype.sortDesc = require_sortDesc2();
    Collection.prototype.sortBy = require_sortBy2();
    Collection.prototype.sortByDesc = require_sortByDesc2();
    Collection.prototype.sortKeys = require_sortKeys2();
    Collection.prototype.sortKeysDesc = require_sortKeysDesc2();
    Collection.prototype.splice = require_splice2();
    Collection.prototype.split = require_split2();
    Collection.prototype.sum = require_sum2();
    Collection.prototype.take = require_take2();
    Collection.prototype.takeUntil = require_takeUntil2();
    Collection.prototype.takeWhile = require_takeWhile2();
    Collection.prototype.tap = require_tap2();
    Collection.prototype.times = require_times2();
    Collection.prototype.toArray = require_toArray2();
    Collection.prototype.toJson = require_toJson2();
    Collection.prototype.transform = require_transform2();
    Collection.prototype.undot = require_undot2();
    Collection.prototype.unless = require_unless2();
    Collection.prototype.unlessEmpty = require_whenNotEmpty2();
    Collection.prototype.unlessNotEmpty = require_whenEmpty2();
    Collection.prototype.union = require_union2();
    Collection.prototype.unique = require_unique2();
    Collection.prototype.unwrap = require_unwrap2();
    Collection.prototype.values = require_values22();
    Collection.prototype.when = require_when2();
    Collection.prototype.whenEmpty = require_whenEmpty2();
    Collection.prototype.whenNotEmpty = require_whenNotEmpty2();
    Collection.prototype.where = require_where2();
    Collection.prototype.whereBetween = require_whereBetween2();
    Collection.prototype.whereIn = require_whereIn2();
    Collection.prototype.whereInstanceOf = require_whereInstanceOf2();
    Collection.prototype.whereNotBetween = require_whereNotBetween2();
    Collection.prototype.whereNotIn = require_whereNotIn2();
    Collection.prototype.whereNull = require_whereNull2();
    Collection.prototype.whereNotNull = require_whereNotNull2();
    Collection.prototype.wrap = require_wrap2();
    Collection.prototype.zip = require_zip2();
    var collect = function collect2(collection) {
      return new Collection(collection);
    };
    module.exports = collect;
    module.exports.collect = collect;
    module.exports["default"] = collect;
    module.exports.Collection = Collection;
  }
});
var __getOwnPropDesc23 = Object.getOwnPropertyDescriptor;
var __decorateClass23 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc23(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var DISCOVERABLE_DECORATOR_KEY_PREFIX3 = "@discoverable:";
var MODULE_METADATA3 = {
  IMPORTS: "imports",
  PROVIDERS: "providers",
  CONTROLLERS: "controllers",
  EXPORTS: "exports"
};
var GLOBAL_MODULE_METADATA3 = "__module:global__";
var PARAMTYPES_METADATA3 = "design:paramtypes";
var SELF_DECLARED_DEPS_METADATA3 = "self:paramtypes";
var OPTIONAL_DEPS_METADATA2 = "optional:paramtypes";
var PROPERTY_DEPS_METADATA3 = "self:properties_metadata";
var OPTIONAL_PROPERTY_DEPS_METADATA2 = "optional:properties_metadata";
var SCOPE_OPTIONS_METADATA3 = "scope:options";
var INJECTABLE_WATERMARK3 = "__injectable__";
function Injectable3(options) {
  return (target) => {
    defineMetadata(INJECTABLE_WATERMARK3, true, target);
    defineMetadata(SCOPE_OPTIONS_METADATA3, options, target);
  };
}
var DiscoverableMetaHostCollection3 = class {
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
var resolvedInstances3 = /* @__PURE__ */ new Map();
function getTokenKey3(token) {
  if (typeof token === "function") return token.name;
  if (typeof token === "symbol") return token.toString();
  return String(token);
}
function inject3(token) {
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
inject3.swap = function swap3(token, instance) {
  const key = getTokenKey3(token);
  resolvedInstances3.set(key, instance);
};
inject3.clear = function clear3(token) {
  const key = getTokenKey3(token);
  resolvedInstances3.delete(key);
};
inject3.clearAll = function clearAll3() {
  resolvedInstances3.clear();
};
function generateMetadataKey3() {
  const cryptoRef = globalThis.crypto;
  const uuid = cryptoRef?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 12)}`;
  return `${DISCOVERABLE_DECORATOR_KEY_PREFIX3}${uuid}`;
}
var DiscoveryService3 = class {
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
    const metadataKey = generateMetadataKey3();
    const decorator = ((opts) => {
      const value = opts ?? {};
      return ((target, propertyKey, descriptor) => {
        if (descriptor && propertyKey !== void 0) {
          defineMetadata(metadataKey, value, descriptor.value);
          return descriptor;
        }
        DiscoverableMetaHostCollection3.addClassMetaHostLink(target, metadataKey);
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
      const wrappers = DiscoverableMetaHostCollection3.getProvidersByMetaKey(
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
DiscoveryService3 = __decorateClass23([
  Injectable3()
], DiscoveryService3);
__toESM3(require_Reflect3());
function Inject3(token) {
  const hasExplicitToken = arguments.length > 0;
  return (target, key, index) => {
    let resolvedToken = token;
    if (!resolvedToken && !hasExplicitToken) {
      if (key !== void 0) {
        resolvedToken = getMetadata("design:type", target, key);
      } else if (index !== void 0) {
        const paramTypes = getMetadata(PARAMTYPES_METADATA3, target) ?? [];
        resolvedToken = paramTypes[index];
      }
    }
    if (resolvedToken && typeof resolvedToken === "object" && "forwardRef" in resolvedToken) {
      const thunk = resolvedToken.forwardRef;
      resolvedToken = typeof thunk === "function" ? thunk() : thunk;
    }
    if (index !== void 0) {
      updateMetadata(
        SELF_DECLARED_DEPS_METADATA3,
        [],
        (deps) => [...deps, { index, param: resolvedToken }],
        target
      );
    } else {
      updateMetadata(
        PROPERTY_DEPS_METADATA3,
        [],
        (props) => [
          ...props,
          { key, type: resolvedToken }
        ],
        target.constructor
      );
    }
  };
}
var PROPERTY_TO_METADATA_KEY3 = {
  imports: MODULE_METADATA3.IMPORTS,
  controllers: MODULE_METADATA3.CONTROLLERS,
  providers: MODULE_METADATA3.PROVIDERS,
  exports: MODULE_METADATA3.EXPORTS
};
var VALID_MODULE_KEYS3 = new Set(Object.keys(PROPERTY_TO_METADATA_KEY3));
function Module3(metadata) {
  const invalidKeys = Object.keys(metadata).filter((key) => !VALID_MODULE_KEYS3.has(key));
  if (invalidKeys.length > 0) {
    throw new Error(
      `Invalid property '${invalidKeys.join("', '")}' passed into the @Module() decorator. Valid properties are: ${[...VALID_MODULE_KEYS3].join(", ")}.`
    );
  }
  return (target) => {
    for (const property in metadata) {
      if (!Object.prototype.hasOwnProperty.call(metadata, property)) continue;
      const metadataKey = PROPERTY_TO_METADATA_KEY3[property];
      defineMetadata(metadataKey, metadata[property], target);
    }
  };
}
function Global3() {
  return (target) => {
    defineMetadata(GLOBAL_MODULE_METADATA3, true, target);
  };
}
function Optional2() {
  return (target, key, index) => {
    if (index !== void 0) {
      updateMetadata(
        OPTIONAL_DEPS_METADATA2,
        [],
        (indices) => [...indices, index],
        target
      );
    } else {
      updateMetadata(
        OPTIONAL_PROPERTY_DEPS_METADATA2,
        [],
        (keys) => [...keys, key],
        target.constructor
      );
    }
  };
}
var Reflector3 = class {
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
Reflector3 = __decorateClass23([
  Injectable3()
], Reflector3);
var DiscoveryModule3 = class {
};
DiscoveryModule3 = __decorateClass23([
  Global3(),
  Module3({
    providers: [DiscoveryService3],
    exports: [DiscoveryService3]
  })
], DiscoveryModule3);
var EVENT_EMITTER_CONFIG = /* @__PURE__ */ Symbol.for("EVENT_EMITTER_CONFIG");
var EVENT_EMITTER = /* @__PURE__ */ Symbol.for("EVENT_EMITTER");
var EVENT_EMITTER_READINESS_WATCHER = /* @__PURE__ */ Symbol.for("EVENT_EMITTER_READINESS_WATCHER");
var EVENT_TRANSPORT_REGISTRY = /* @__PURE__ */ Symbol.for("EVENT_TRANSPORT_REGISTRY");
var LOGGER_CONFIG2 = /* @__PURE__ */ Symbol.for("LOGGER_CONFIG");
var LOGGER_MANAGER2 = /* @__PURE__ */ Symbol.for("LOGGER_MANAGER");
var LogLevel2 = /* @__PURE__ */ ((LogLevel22) => {
  LogLevel22[LogLevel22["Debug"] = 0] = "Debug";
  LogLevel22[LogLevel22["Info"] = 1] = "Info";
  LogLevel22[LogLevel22["Warn"] = 2] = "Warn";
  LogLevel22[LogLevel22["Error"] = 3] = "Error";
  LogLevel22[LogLevel22["Fatal"] = 4] = "Fatal";
  return LogLevel22;
})(LogLevel2 || {});
__toESM3(require_dist2());
var Str2 = class _Str2 {
  /**
   * Return the remainder of a string after the first occurrence of a given value.
   *
   * @param subject - The string to search in
   * @param search  - The value to search for
   * @returns The portion of the string after the first occurrence of search
   *
   * @example
   * ```typescript
   * Str.after('hello world', 'hello '); // 'world'
   * Str.after('a.b.c', '.');            // 'b.c'
   * ```
   */
  static after(subject, search) {
    if (search === "") return subject;
    const index = subject.indexOf(search);
    return index === -1 ? subject : subject.substring(index + search.length);
  }
  /**
   * Return the remainder of a string after the last occurrence of a given value
   */
  static afterLast(subject, search) {
    if (search === "") return subject;
    const index = subject.lastIndexOf(search);
    return index === -1 ? subject : subject.substring(index + search.length);
  }
  /**
   * Convert a string to title case following APA guidelines
   */
  static apa(value) {
    const minorWords = [
      "a",
      "an",
      "and",
      "as",
      "at",
      "but",
      "by",
      "for",
      "in",
      "of",
      "on",
      "or",
      "the",
      "to",
      "up"
    ];
    const words = value.split(" ");
    return words.map((word, index) => {
      if (index === 0 || !minorWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    }).join(" ");
  }
  /**
   * Transliterate a UTF-8 value to ASCII
   */
  static ascii(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  /**
   * Get the portion of a string before the first occurrence of a given value
   */
  static before(subject, search) {
    if (search === "") return subject;
    const index = subject.indexOf(search);
    return index === -1 ? subject : subject.substring(0, index);
  }
  /**
   * Get the portion of a string before the last occurrence of a given value
   */
  static beforeLast(subject, search) {
    if (search === "") return subject;
    const index = subject.lastIndexOf(search);
    return index === -1 ? subject : subject.substring(0, index);
  }
  /**
   * Get the portion of a string between two values
   */
  static between(subject, from, to) {
    if (from === "" || to === "") return subject;
    const startIndex = subject.indexOf(from);
    if (startIndex === -1) return "";
    const start = startIndex + from.length;
    const endIndex = subject.indexOf(to, start);
    return endIndex === -1 ? "" : subject.substring(start, endIndex);
  }
  /**
   * Get the smallest possible portion of a string between two values
   */
  static betweenFirst(subject, from, to) {
    return _Str2.between(subject, from, to);
  }
  /**
   * Convert a string to camelCase.
   *
   * Handles word boundaries from separators (`-`, `_`, space) and from
   * consecutive uppercase runs (e.g. `XML_HTTP_REQUEST` → `xmlHttpRequest`).
   *
   * @param value - The input string
   * @returns The camelCase string
   *
   * @example
   * ```typescript
   * Str.camel('foo_bar');           // 'fooBar'
   * Str.camel('foo-bar baz');        // 'fooBarBaz'
   * Str.camel('XML_HTTP_REQUEST');  // 'xmlHttpRequest'
   * ```
   */
  static camel(value) {
    return _Str2.studly(value).replace(/^(.)/, (char) => char.toLowerCase());
  }
  /**
   * Get the character at the specified index
   */
  static charAt(subject, index) {
    if (index < 0 || index >= subject.length) return false;
    return subject.charAt(index);
  }
  /**
   * Remove the first occurrence of the given value from the start of the string
   */
  static chopStart(subject, search) {
    const searches = Array.isArray(search) ? search : [search];
    for (const s of searches) {
      if (subject.startsWith(s)) {
        return subject.substring(s.length);
      }
    }
    return subject;
  }
  /**
   * Remove the last occurrence of the given value from the end of the string
   */
  static chopEnd(subject, search) {
    const searches = Array.isArray(search) ? search : [search];
    for (const s of searches) {
      if (subject.endsWith(s)) {
        return subject.substring(0, subject.length - s.length);
      }
    }
    return subject;
  }
  /**
   * Determine if a given string contains a given substring
   */
  static contains(haystack, needles, ignoreCase = false) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    const subject = ignoreCase ? haystack.toLowerCase() : haystack;
    return needleArray.some((needle) => {
      const search = ignoreCase ? needle.toLowerCase() : needle;
      return subject.includes(search);
    });
  }
  /**
   * Determine if a given string contains all array values
   */
  static containsAll(haystack, needles, ignoreCase = false) {
    const subject = ignoreCase ? haystack.toLowerCase() : haystack;
    return needles.every((needle) => {
      const search = ignoreCase ? needle.toLowerCase() : needle;
      return subject.includes(search);
    });
  }
  /**
   * Determine if a given string doesn't contain a given substring
   */
  static doesntContain(haystack, needles, ignoreCase = false) {
    return !_Str2.contains(haystack, needles, ignoreCase);
  }
  /**
   * Replace consecutive instances of a character with a single instance
   */
  static deduplicate(value, character = " ") {
    const escaped = character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`${escaped}+`, "g");
    return value.replace(regex, character);
  }
  /**
   * Determine if a given string ends with a given substring
   */
  static endsWith(haystack, needles) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    return needleArray.some((needle) => haystack.endsWith(needle));
  }
  /**
   * Extract an excerpt from text that matches the first instance of a phrase
   */
  static excerpt(text, phrase, options = {}) {
    const radius = options.radius ?? 100;
    const omission = options.omission ?? "...";
    const index = text.indexOf(phrase);
    if (index === -1) return "";
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + phrase.length + radius);
    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = omission + excerpt;
    if (end < text.length) excerpt = excerpt + omission;
    return excerpt;
  }
  /**
   * Cap a string with a single instance of a given value
   */
  static finish(value, cap) {
    return value.endsWith(cap) ? value : value + cap;
  }
  /**
   * Convert a string to headline case
   */
  static headline(value) {
    return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  }
  /**
   * Determine if a given string matches a given pattern
   */
  static is(pattern, value, ignoreCase = false) {
    const regexPattern = pattern.replace(/\*/g, ".*");
    const flags = ignoreCase ? "i" : "";
    const regex = new RegExp(`^${regexPattern}$`, flags);
    return regex.test(value);
  }
  /**
   * Determine if a given string is 7-bit ASCII
   */
  static isAscii(value) {
    return /^[\x00-\x7F]*$/.test(value);
  }
  /**
   * Determine if a given string is valid JSON
   */
  static isJson(value) {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Determine if a given string is a valid URL
   */
  static isUrl(value, protocols) {
    try {
      if (typeof URL === "undefined") {
        const urlPattern = /^https?:\/\/.+/i;
        return urlPattern.test(value);
      }
      const urlObj = new URL(value);
      if (protocols) {
        return protocols.includes(urlObj.protocol.replace(":", ""));
      }
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Determine if a given string is a valid ULID
   */
  static isUlid(value) {
    return /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(value);
  }
  /**
   * Determine if a given string is a valid UUID
   */
  static isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }
  /**
   * Convert a string to kebab-case
   */
  static kebab(value) {
    return value.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
  }
  /**
   * Return the given string with the first character lowercased
   */
  static lcfirst(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
  /**
   * Return the length of the given string
   */
  static len(value) {
    return value.length;
  }
  /**
   * Limit the number of characters in a string
   */
  static limit(value, limit = 100, end = "...", preserveWords = false) {
    if (value.length <= limit) return value;
    let truncated = value.substring(0, limit);
    if (preserveWords) {
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace > 0) {
        truncated = truncated.substring(0, lastSpace);
      }
    }
    return truncated + end;
  }
  /**
   * Convert the given string to lowercase
   */
  static lower(value) {
    return value.toLowerCase();
  }
  /**
   * Masks a portion of a string with a repeated character
   */
  static mask(value, character, index, length) {
    if (index < 0) {
      index = value.length + index;
    }
    const maskLength = length ?? value.length - index;
    const mask = character.repeat(Math.abs(maskLength));
    return value.substring(0, index) + mask + value.substring(index + Math.abs(maskLength));
  }
  /**
   * Pad both sides of a string with another
   */
  static padBoth(value, length, pad = " ") {
    const totalPadding = length - value.length;
    if (totalPadding <= 0) return value;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;
    return pad.repeat(leftPadding) + value + pad.repeat(rightPadding);
  }
  /**
   * Pad the left side of a string with another
   */
  static padLeft(value, length, pad = " ") {
    return value.padStart(length, pad);
  }
  /**
   * Pad the right side of a string with another
   */
  static padRight(value, length, pad = " ") {
    return value.padEnd(length, pad);
  }
  /**
   * Get the plural form of an English word
   */
  static plural(value, count = 2) {
    if (count === 1) return value;
    if (value.endsWith("y") && !/[aeiou]y$/i.test(value)) {
      return value.slice(0, -1) + "ies";
    }
    if (value.endsWith("s") || value.endsWith("x") || value.endsWith("z") || value.endsWith("ch") || value.endsWith("sh")) {
      return value + "es";
    }
    return value + "s";
  }
  /**
   * Pluralize the last word of an English, studly caps case string
   */
  static pluralStudly(value, count = 2) {
    const parts = value.match(/[A-Z][a-z]*/g) || [value];
    const lastWord = parts[parts.length - 1];
    const pluralized = _Str2.plural(lastWord, count);
    parts[parts.length - 1] = pluralized;
    return parts.join("");
  }
  /**
   * Find the position of the first occurrence of a substring
   */
  static position(haystack, needle) {
    const pos = haystack.indexOf(needle);
    return pos === -1 ? false : pos;
  }
  /**
   * Generate a random string
   */
  static random(length = 16) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  /**
   * Remove the given value from the string
   */
  static remove(search, subject, caseSensitive = true) {
    const searches = Array.isArray(search) ? search : [search];
    let result = subject;
    searches.forEach((s) => {
      const flags = caseSensitive ? "g" : "gi";
      const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(escaped, flags), "");
    });
    return result;
  }
  /**
   * Repeat the given string
   */
  static repeat(value, times) {
    return value.repeat(times);
  }
  /**
   * Replace the given value in the given string
   */
  static replace(search, replace, subject, caseSensitive = true) {
    const flags = caseSensitive ? "g" : "gi";
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return subject.replace(new RegExp(escaped, flags), replace);
  }
  /**
   * Replace a given value in the string sequentially with an array
   */
  static replaceArray(search, replacements, subject) {
    let result = subject;
    let index = 0;
    while (result.includes(search) && index < replacements.length) {
      result = result.replace(search, replacements[index]);
      index++;
    }
    return result;
  }
  /**
   * Replace the first occurrence of a given value in the string
   */
  static replaceFirst(search, replace, subject) {
    return subject.replace(search, replace);
  }
  /**
   * Replace the last occurrence of a given value in the string
   */
  static replaceLast(search, replace, subject) {
    const index = subject.lastIndexOf(search);
    if (index === -1) return subject;
    return subject.substring(0, index) + replace + subject.substring(index + search.length);
  }
  /**
   * Replace the first occurrence only if it appears at the start
   */
  static replaceStart(search, replace, subject) {
    return subject.startsWith(search) ? replace + subject.substring(search.length) : subject;
  }
  /**
   * Replace the last occurrence only if it appears at the end
   */
  static replaceEnd(search, replace, subject) {
    return subject.endsWith(search) ? subject.substring(0, subject.length - search.length) + replace : subject;
  }
  /**
   * Reverse the given string
   */
  static reverse(value) {
    return value.split("").reverse().join("");
  }
  /**
   * Get the singular form of an English word
   */
  static singular(value) {
    if (value.endsWith("ies")) {
      return value.slice(0, -3) + "y";
    }
    if (value.endsWith("es")) {
      return value.slice(0, -2);
    }
    if (value.endsWith("s") && !value.endsWith("ss")) {
      return value.slice(0, -1);
    }
    return value;
  }
  /**
   * Generate a URL friendly slug
   */
  static slug(value, separator = "-") {
    return value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, separator).replace(new RegExp(`${separator}+`, "g"), separator).replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
  }
  /**
   * Convert a string to snake_case.
   *
   * Handles word boundaries from separators (`-`, `_`, space) and from
   * uppercase boundaries (camelCase or consecutive-uppercase runs).
   *
   * @param value     - The input string
   * @param delimiter - Word delimiter (default: `'_'`)
   * @returns The snake_case string
   *
   * @example
   * ```typescript
   * Str.snake('camelCase');     // 'camel_case'
   * Str.snake('HTMLParser');    // 'html_parser'
   * Str.snake('foo bar baz');    // 'foo_bar_baz'
   * ```
   */
  static snake(value, delimiter = "_") {
    return _Str2.splitWords(value).map((word) => word.toLowerCase()).join(delimiter);
  }
  /**
   * Remove all extraneous whitespace
   */
  static squish(value) {
    return value.trim().replace(/\s+/g, " ");
  }
  /**
   * Begin a string with a single instance of a given value
   */
  static start(value, prefix) {
    return value.startsWith(prefix) ? value : prefix + value;
  }
  /**
   * Determine if a given string starts with a given substring
   */
  static startsWith(haystack, needles) {
    const needleArray = Array.isArray(needles) ? needles : [needles];
    return needleArray.some((needle) => haystack.startsWith(needle));
  }
  /**
   * Convert a value to StudlyCase (a.k.a. PascalCase).
   *
   * Splits the input into words on separators (`-`, `_`, space) and on
   * uppercase boundaries (camelCase or consecutive-uppercase runs), then
   * joins each word with its first letter capitalized and the rest
   * lowercased.
   *
   * @param value - The input string
   * @returns The StudlyCase string
   *
   * @example
   * ```typescript
   * Str.studly('hello_world');           // 'HelloWorld'
   * Str.studly('hello-world foo bar');    // 'HelloWorldFooBar'
   * Str.studly('XML_HTTP_REQUEST');      // 'XmlHttpRequest'
   * Str.studly('camelCase');              // 'CamelCase'
   * ```
   */
  static studly(value) {
    return _Str2.splitWords(value).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
  }
  /**
   * Split a string into word tokens.
   *
   * Splits on `-`, `_`, whitespace, and on uppercase boundaries. Treats
   * consecutive uppercase letters followed by a lowercase letter as the
   * end of an uppercase run (so `XMLHttp` → `['XML', 'Http']`).
   *
   * @param value - The input string
   * @returns Array of word tokens (lowercased boundaries preserved)
   *
   * @internal Used by `camel`, `studly`, `kebab`, `snake`, etc.
   */
  static splitWords(value) {
    if (!value) return [];
    return value.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_\s]+/g, " ").trim().split(" ").filter(Boolean);
  }
  /**
   * Returns the portion of string specified by the start and length parameters
   */
  static substr(value, start, length) {
    return value.substr(start, length);
  }
  /**
   * Returns the number of substring occurrences
   */
  static substrCount(haystack, needle) {
    return (haystack.match(new RegExp(needle, "g")) || []).length;
  }
  /**
   * Replace text within a portion of a string
   */
  static substrReplace(value, replace, start, length) {
    const actualLength = length ?? value.length - start;
    return value.substring(0, start) + replace + value.substring(start + actualLength);
  }
  /**
   * Swap multiple keywords in a string with other keywords.
   *
   * Performs an atomic single-pass swap — replacements are applied
   * simultaneously so the output of one swap is never re-swapped.
   *
   * @param map     - Map of search → replace pairs
   * @param subject - The string to perform swaps on
   * @returns The string with all swaps applied
   *
   * @example
   * ```typescript
   * Str.swap({ foo: 'bar', bar: 'baz' }, 'foo bar');
   * // → 'bar baz' (not 'baz baz' — atomic, no re-swapping)
   * ```
   */
  static swap(map, subject) {
    const keys = Object.keys(map);
    if (keys.length === 0) return subject;
    const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
    const escaped = sortedKeys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(escaped.join("|"), "g");
    return subject.replace(pattern, (match) => map[match] ?? match);
  }
  /**
   * Take the first or last {limit} characters
   */
  static take(value, limit) {
    if (limit < 0) {
      return value.slice(limit);
    }
    return value.slice(0, limit);
  }
  /**
   * Convert the given string to title case
   */
  static title(value) {
    return value.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  /**
   * Convert the given string to Base64
   */
  static toBase64(value) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(value).toString("base64");
    }
    if (typeof btoa !== "undefined") {
      return btoa(value);
    }
    throw new Error("Base64 encoding not supported in this environment");
  }
  /**
   * Transliterate a string to its closest ASCII representation
   */
  static transliterate(value) {
    return _Str2.ascii(value);
  }
  /**
   * Trim whitespace from both ends of the string
   */
  static trim(value, characters) {
    if (!characters) return value.trim();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`^[${escaped}]+|[${escaped}]+$`, "g"), "");
  }
  /**
   * Trim whitespace from the beginning of the string
   */
  static ltrim(value, characters) {
    if (!characters) return value.trimStart();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`^[${escaped}]+`, "g"), "");
  }
  /**
   * Trim whitespace from the end of the string
   */
  static rtrim(value, characters) {
    if (!characters) return value.trimEnd();
    const escaped = characters.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp(`[${escaped}]+$`, "g"), "");
  }
  /**
   * Make a string's first character uppercase
   */
  static ucfirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  /**
   * Split a string by uppercase characters
   */
  static ucsplit(value) {
    return value.match(/[A-Z][a-z]*/g) || [value];
  }
  /**
   * Convert the given string to uppercase
   */
  static upper(value) {
    return value.toUpperCase();
  }
  /**
   * Remove the specified strings from the beginning and end
   */
  static unwrap(value, before, after) {
    const actualAfter = after ?? before;
    let result = value;
    if (result.startsWith(before)) {
      result = result.substring(before.length);
    }
    if (result.endsWith(actualAfter)) {
      result = result.substring(0, result.length - actualAfter.length);
    }
    return result;
  }
  /**
   * Get the number of words a string contains
   */
  static wordCount(value) {
    return value.trim().split(/\s+/).filter((word) => word.length > 0).length;
  }
  /**
   * Wrap a string to a given number of characters
   */
  static wordWrap(value, characters = 75, breakStr = "\n") {
    const words = value.split(" ");
    let line = "";
    const lines = [];
    words.forEach((word) => {
      if ((line + word).length > characters) {
        if (line) lines.push(line.trim());
        line = word + " ";
      } else {
        line += word + " ";
      }
    });
    if (line) lines.push(line.trim());
    return lines.join(breakStr);
  }
  /**
   * Limit the number of words in a string
   */
  static words(value, words = 100, end = "...") {
    const wordArray = value.split(/\s+/);
    if (wordArray.length <= words) return value;
    return wordArray.slice(0, words).join(" ") + end;
  }
  /**
   * Wrap the string with the given strings
   */
  static wrap(value, before, after) {
    const actualAfter = after ?? before;
    return before + value + actualAfter;
  }
};
var MultipleInstanceManager2 = class {
  constructor() {
    this.instances = /* @__PURE__ */ new Map();
    this.pending = /* @__PURE__ */ new Map();
    this.customCreators = /* @__PURE__ */ new Map();
    this.driverKey = "driver";
  }
  /**
   * Create a driver instance asynchronously.
   * Called by `instanceAsync()` when no custom creator is registered.
   *
   * Override this for drivers that require async initialization
   * (e.g., establishing connections, loading remote config).
   *
   * By default, falls back to the sync `createDriver()`.
   *
   * @param driver - The driver name from config
   * @param config - The raw instance config
   * @returns A promise that resolves to the driver instance
   */
  async createDriverAsync(driver, config) {
    return this.createDriver(driver, config);
  }
  // ── Lifecycle hook ──────────────────────────────────────────────────────
  /**
   * Called after a new instance is created and before it's cached.
   * Override to configure instances (e.g., set names, event dispatchers).
   *
   * @param name - The instance name
   * @param instance - The newly created instance
   * @returns The instance (possibly modified)
   */
  onInstanceCreated(_name, instance) {
    return instance;
  }
  // ── Public API — Sync ───────────────────────────────────────────────────
  /**
   * Get an instance by name (sync).
   *
   * Returns a cached instance if available, otherwise resolves
   * via `createDriver()` and caches it.
   *
   * @param name - Instance name (uses default if omitted)
   */
  instance(name) {
    const instanceName = name ?? this.getDefaultInstance();
    const existing = this.instances.get(instanceName);
    if (existing) {
      return existing;
    }
    const resolved = this.resolve(instanceName);
    this.instances.set(instanceName, resolved);
    return resolved;
  }
  // ── Public API — Async ──────────────────────────────────────────────────
  /**
   * Get an instance by name (async).
   *
   * Returns a cached instance if available, otherwise resolves
   * via `createDriverAsync()` and caches it.
   *
   * Deduplicates in-flight resolutions — if two callers request
   * the same instance simultaneously, they share one Promise.
   *
   * @param name - Instance name (uses default if omitted)
   *
   * @example
   * ```typescript
   * // In RedisManager:
   * async connection(name?: string): Promise<RedisConnection> {
   *   return this.instanceAsync(name);
   * }
   * ```
   */
  async instanceAsync(name) {
    const instanceName = name ?? this.getDefaultInstance();
    const existing = this.instances.get(instanceName);
    if (existing) {
      return existing;
    }
    let promise = this.pending.get(instanceName);
    if (!promise) {
      promise = this.resolveAsync(instanceName);
      this.pending.set(instanceName, promise);
    }
    try {
      const resolved = await promise;
      this.instances.set(instanceName, resolved);
      return resolved;
    } finally {
      this.pending.delete(instanceName);
    }
  }
  // ── Public API — Registration ───────────────────────────────────────────
  /**
   * Register a custom driver creator.
   * Custom creators take priority over built-in drivers.
   */
  extend(driver, creator) {
    this.customCreators.set(driver, creator);
    return this;
  }
  // ── Public API — Cache management ───────────────────────────────────────
  /**
   * Remove a cached instance, forcing re-creation on next access.
   *
   * @param name - Instance name(s). Uses default if omitted.
   */
  forgetInstance(name) {
    const names = name ? Array.isArray(name) ? name : [name] : [this.getDefaultInstance()];
    for (const n of names) {
      this.instances.delete(n);
    }
    return this;
  }
  /**
   * Remove all cached instances.
   */
  purge() {
    this.instances.clear();
    this.pending.clear();
  }
  /**
   * Check if an instance has been resolved and cached.
   */
  hasInstance(name) {
    return this.instances.has(name);
  }
  /**
   * Get all resolved instance names.
   */
  getResolvedInstances() {
    return Array.from(this.instances.keys());
  }
  /**
   * Manually set a resolved instance in the cache.
   * Useful when instance creation happens outside the normal
   * `instance()` / `instanceAsync()` flow.
   */
  setInstance(name, instance) {
    this.instances.set(name, instance);
  }
  // ── Deprecated aliases (backward compat) ────────────────────────────────
  /**
   * @deprecated Use `hasInstance()` instead.
   */
  hasResolvedInstance(name) {
    return this.hasInstance(name);
  }
  // ── Private — Sync resolution ───────────────────────────────────────────
  resolve(name) {
    const config = this.getInstanceConfig(name);
    if (!config) {
      throw new Error(`Instance [${name}] is not defined.`);
    }
    const driver = config[this.driverKey];
    if (!driver) {
      throw new Error(`Instance [${name}] does not specify a "${this.driverKey}".`);
    }
    const customCreator = this.customCreators.get(driver);
    const instance = customCreator ? customCreator(config) : this.createDriver(driver, config);
    return this.onInstanceCreated(name, instance);
  }
  // ── Private — Async resolution ──────────────────────────────────────────
  async resolveAsync(name) {
    const config = this.getInstanceConfig(name);
    if (!config) {
      throw new Error(`Instance [${name}] is not defined.`);
    }
    const driver = config[this.driverKey];
    if (!driver) {
      throw new Error(`Instance [${name}] does not specify a "${this.driverKey}".`);
    }
    const customCreator = this.customCreators.get(driver);
    const instance = customCreator ? customCreator(config) : await this.createDriverAsync(driver, config);
    return this.onInstanceCreated(name, instance);
  }
};
var LogLevels2 = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
};
var LogTypes2 = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: LogLevels2.fatal
  },
  error: {
    level: LogLevels2.error
  },
  // Level 1
  warn: {
    level: LogLevels2.warn
  },
  // Level 2
  log: {
    level: LogLevels2.log
  },
  // Level 3
  info: {
    level: LogLevels2.info
  },
  success: {
    level: LogLevels2.success
  },
  fail: {
    level: LogLevels2.fail
  },
  ready: {
    level: LogLevels2.info
  },
  start: {
    level: LogLevels2.info
  },
  box: {
    level: LogLevels2.info
  },
  // Level 4
  debug: {
    level: LogLevels2.debug
  },
  // Level 5
  trace: {
    level: LogLevels2.trace
  },
  // Verbose
  verbose: {
    level: LogLevels2.verbose
  }
};
function isPlainObject$12(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu2(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$12(defaults)) {
    return _defu2(baseObject, {}, namespace);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$12(value) && isPlainObject$12(object[key])) {
      object[key] = _defu2(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString()
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu2(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu2(p, c, ""), {})
  );
}
var defu2 = createDefu2();
function isPlainObject2(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj2(arg) {
  if (!isPlainObject2(arg)) {
    return false;
  }
  if (!arg.message && !arg.args) {
    return false;
  }
  if (arg.stack) {
    return false;
  }
  return true;
}
var paused2 = false;
var queue2 = [];
var Consola2 = class _Consola {
  options;
  _lastLog;
  _mockFn;
  /**
   * Creates an instance of Consola with specified options or defaults.
   *
   * @param {Partial<ConsolaOptions>} [options={}] - Configuration options for the Consola instance.
   */
  constructor(options = {}) {
    const types = options.types || LogTypes2;
    this.options = defu2(
      {
        ...options,
        defaults: { ...options.defaults },
        level: _normalizeLogLevel2(options.level, types),
        reporters: [...options.reporters || []]
      },
      {
        types: LogTypes2,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: true,
          colors: false,
          compact: true
        }
      }
    );
    for (const type in types) {
      const defaults = {
        type,
        ...this.options.defaults,
        ...types[type]
      };
      this[type] = this._wrapLogFn(defaults);
      this[type].raw = this._wrapLogFn(
        defaults,
        true
      );
    }
    if (this.options.mockFn) {
      this.mockTypes();
    }
    this._lastLog = {};
  }
  /**
   * Gets the current log level of the Consola instance.
   *
   * @returns {number} The current log level.
   */
  get level() {
    return this.options.level;
  }
  /**
   * Sets the minimum log level that will be output by the instance.
   *
   * @param {number} level - The new log level to set.
   */
  set level(level) {
    this.options.level = _normalizeLogLevel2(
      level,
      this.options.types,
      this.options.level
    );
  }
  /**
   * Displays a prompt to the user and returns the response.
   * Throw an error if `prompt` is not supported by the current configuration.
   *
   * @template T
   * @param {string} message - The message to display in the prompt.
   * @param {T} [opts] - Optional options for the prompt. See {@link PromptOptions}.
   * @returns {promise<T>} A promise that infer with the prompt options. See {@link PromptOptions}.
   */
  prompt(message, opts) {
    if (!this.options.prompt) {
      throw new Error("prompt is not supported!");
    }
    return this.options.prompt(message, opts);
  }
  /**
   * Creates a new instance of Consola, inheriting options from the current instance, with possible overrides.
   *
   * @param {Partial<ConsolaOptions>} options - Optional overrides for the new instance. See {@link ConsolaOptions}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  create(options) {
    const instance = new _Consola({
      ...this.options,
      ...options
    });
    if (this._mockFn) {
      instance.mockTypes(this._mockFn);
    }
    return instance;
  }
  /**
   * Creates a new Consola instance with the specified default log object properties.
   *
   * @param {InputLogObject} defaults - Default properties to include in any log from the new instance. See {@link InputLogObject}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withDefaults(defaults) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...defaults
      }
    });
  }
  /**
   * Creates a new Consola instance with a specified tag, which will be included in every log.
   *
   * @param {string} tag - The tag to include in each log of the new instance.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withTag(tag) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag
    });
  }
  /**
   * Adds a custom reporter to the Consola instance.
   * Reporters will be called for each log message, depending on their implementation and log level.
   *
   * @param {ConsolaReporter} reporter - The reporter to add. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  addReporter(reporter) {
    this.options.reporters.push(reporter);
    return this;
  }
  /**
   * Removes a custom reporter from the Consola instance.
   * If no reporter is specified, all reporters will be removed.
   *
   * @param {ConsolaReporter} reporter - The reporter to remove. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  removeReporter(reporter) {
    if (reporter) {
      const i = this.options.reporters.indexOf(reporter);
      if (i !== -1) {
        return this.options.reporters.splice(i, 1);
      }
    } else {
      this.options.reporters.splice(0);
    }
    return this;
  }
  /**
   * Replaces all reporters of the Consola instance with the specified array of reporters.
   *
   * @param {ConsolaReporter[]} reporters - The new reporters to set. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  setReporters(reporters) {
    this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
    return this;
  }
  wrapAll() {
    this.wrapConsole();
    this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole();
    this.restoreStd();
  }
  /**
   * Overrides console methods with Consola logging methods for consistent logging.
   */
  wrapConsole() {
    for (const type in this.options.types) {
      if (!console["__" + type]) {
        console["__" + type] = console[type];
      }
      console[type] = this[type].raw;
    }
  }
  /**
   * Restores the original console methods, removing Consola overrides.
   */
  restoreConsole() {
    for (const type in this.options.types) {
      if (console["__" + type]) {
        console[type] = console["__" + type];
        delete console["__" + type];
      }
    }
  }
  /**
   * Overrides standard output and error streams to redirect them through Consola.
   */
  wrapStd() {
    this._wrapStream(this.options.stdout, "log");
    this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(stream, type) {
    if (!stream) {
      return;
    }
    if (!stream.__write) {
      stream.__write = stream.write;
    }
    stream.write = (data) => {
      this[type].raw(String(data).trim());
    };
  }
  /**
   * Restores the original standard output and error streams, removing the Consola redirection.
   */
  restoreStd() {
    this._restoreStream(this.options.stdout);
    this._restoreStream(this.options.stderr);
  }
  _restoreStream(stream) {
    if (!stream) {
      return;
    }
    if (stream.__write) {
      stream.write = stream.__write;
      delete stream.__write;
    }
  }
  /**
   * Pauses logging, queues incoming logs until resumed.
   */
  pauseLogs() {
    paused2 = true;
  }
  /**
   * Resumes logging, processing any queued logs.
   */
  resumeLogs() {
    paused2 = false;
    const _queue = queue2.splice(0);
    for (const item of _queue) {
      item[0]._logFn(item[1], item[2]);
    }
  }
  /**
   * Replaces logging methods with mocks if a mock function is provided.
   *
   * @param {ConsolaOptions["mockFn"]} mockFn - The function to use for mocking logging methods. See {@link ConsolaOptions["mockFn"]}.
   */
  mockTypes(mockFn) {
    const _mockFn = mockFn || this.options.mockFn;
    this._mockFn = _mockFn;
    if (typeof _mockFn !== "function") {
      return;
    }
    for (const type in this.options.types) {
      this[type] = _mockFn(type, this.options.types[type]) || this[type];
      this[type].raw = this[type];
    }
  }
  _wrapLogFn(defaults, isRaw) {
    return (...args) => {
      if (paused2) {
        queue2.push([this, defaults, args, isRaw]);
        return;
      }
      return this._logFn(defaults, args, isRaw);
    };
  }
  _logFn(defaults, args, isRaw) {
    if ((defaults.level || 0) > this.level) {
      return false;
    }
    const logObj = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...defaults,
      level: _normalizeLogLevel2(defaults.level, this.options.types)
    };
    if (!isRaw && args.length === 1 && isLogObj2(args[0])) {
      Object.assign(logObj, args[0]);
    } else {
      logObj.args = [...args];
    }
    if (logObj.message) {
      logObj.args.unshift(logObj.message);
      delete logObj.message;
    }
    if (logObj.additional) {
      if (!Array.isArray(logObj.additional)) {
        logObj.additional = logObj.additional.split("\n");
      }
      logObj.args.push("\n" + logObj.additional.join("\n"));
      delete logObj.additional;
    }
    logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
    logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
    const resolveLog = (newLog = false) => {
      const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && repeated > 0) {
        const args2 = [...this._lastLog.object.args];
        if (repeated > 1) {
          args2.push(`(repeated ${repeated} times)`);
        }
        this._log({ ...this._lastLog.object, args: args2 });
        this._lastLog.count = 1;
      }
      if (newLog) {
        this._lastLog.object = logObj;
        this._log(logObj);
      }
    };
    clearTimeout(this._lastLog.timeout);
    const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
    this._lastLog.time = logObj.date;
    if (diffTime < this.options.throttle) {
      try {
        const serializedLog = JSON.stringify([
          logObj.type,
          logObj.tag,
          logObj.args
        ]);
        const isSameLog = this._lastLog.serialized === serializedLog;
        this._lastLog.serialized = serializedLog;
        if (isSameLog) {
          this._lastLog.count = (this._lastLog.count || 0) + 1;
          if (this._lastLog.count > this.options.throttleMin) {
            this._lastLog.timeout = setTimeout(
              resolveLog,
              this.options.throttle
            );
            return;
          }
        }
      } catch {
      }
    }
    resolveLog(true);
  }
  _log(logObj) {
    for (const reporter of this.options.reporters) {
      reporter.log(logObj, {
        options: this.options
      });
    }
  }
};
function _normalizeLogLevel2(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel;
  }
  if (typeof input === "number") {
    return input;
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level;
  }
  return defaultLevel;
}
Consola2.prototype.add = Consola2.prototype.addReporter;
Consola2.prototype.remove = Consola2.prototype.removeReporter;
Consola2.prototype.clear = Consola2.prototype.removeReporter;
Consola2.prototype.withScope = Consola2.prototype.withTag;
Consola2.prototype.mock = Consola2.prototype.mockTypes;
Consola2.prototype.pause = Consola2.prototype.pauseLogs;
Consola2.prototype.resume = Consola2.prototype.resumeLogs;
function createConsola3(options = {}) {
  return new Consola2(options);
}
var BrowserReporter2 = class {
  options;
  defaultColor;
  levelColorMap;
  typeColorMap;
  constructor(options) {
    this.options = { ...options };
    this.defaultColor = "#7f8c8d";
    this.levelColorMap = {
      0: "#c0392b",
      // Red
      1: "#f39c12",
      // Yellow
      3: "#00BCD4"
      // Cyan
    };
    this.typeColorMap = {
      success: "#2ecc71"
      // Green
    };
  }
  _getLogFn(level) {
    if (level < 1) {
      return console.__error || console.error;
    }
    if (level === 1) {
      return console.__warn || console.warn;
    }
    return console.__log || console.log;
  }
  log(logObj) {
    const consoleLogFn = this._getLogFn(logObj.level);
    const type = logObj.type === "log" ? "" : logObj.type;
    const tag = logObj.tag || "";
    const color = this.typeColorMap[logObj.type] || this.levelColorMap[logObj.level] || this.defaultColor;
    const style = `
      background: ${color};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `;
    const badge = `%c${[tag, type].filter(Boolean).join(":")}`;
    if (typeof logObj.args[0] === "string") {
      consoleLogFn(
        `${badge}%c ${logObj.args[0]}`,
        style,
        // Empty string as style resets to default console style
        "",
        ...logObj.args.slice(1)
      );
    } else {
      consoleLogFn(badge, style, ...logObj.args);
    }
  }
};
function createConsola22(options = {}) {
  const consola2 = createConsola3({
    reporters: options.reporters || [new BrowserReporter2({})],
    prompt(message, options2 = {}) {
      if (options2.type === "confirm") {
        return Promise.resolve(confirm(message));
      }
      return Promise.resolve(prompt(message));
    },
    ...options
  });
  return consola2;
}
createConsola22();
var ContainerContext2 = react.createContext(null);
ContainerContext2.displayName = "ContainerContext";
var __getOwnPropDesc32 = Object.getOwnPropertyDescriptor;
var __decorateClass32 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc32(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
var __decorateParam22 = (index, decorator) => (target, key) => decorator(target, key, index);
({
  [LogLevel2.Debug]: "color: #8B8B8B",
  [LogLevel2.Info]: "color: #2196F3",
  [LogLevel2.Warn]: "color: #FF9800",
  [LogLevel2.Error]: "color: #F44336",
  [LogLevel2.Fatal]: "color: #FFFFFF; background: #F44336; font-weight: bold; padding: 1px 4px; border-radius: 2px"
});
var REPORTER_METADATA2 = "REPORTER_METADATA";
var LOGGER_STATIC_REF2 = "LoggerStaticRef";
function Reporter2(options) {
  return (target) => {
    Injectable3()(target);
    defineMetadata(REPORTER_METADATA2, options, target);
  };
}
function toConsolaLevel2(level) {
  switch (level) {
    case LogLevel2.Debug:
      return 4;
    case LogLevel2.Info:
      return 3;
    case LogLevel2.Warn:
      return 2;
    case LogLevel2.Error:
      return 1;
    case LogLevel2.Fatal:
      return 0;
    default:
      return 3;
  }
}
var ConsoleReporter2 = class {
  /**
   * Create a new ConsoleReporter instance.
   *
   * @param options - Optional configuration for level and tag
   */
  constructor(options = {}) {
    this.name = "console";
    this._level = options.level ?? LogLevel2.Debug;
    this.consola = createConsola22({
      level: toConsolaLevel2(this._level),
      defaults: {
        tag: options.tag ?? "app"
      }
    });
  }
  /**
   * Deliver a log entry to the browser console.
   *
   * Routes the entry to the appropriate consola method based on
   * the log level. Context is passed as additional arguments so
   * DevTools can expand it as a structured object.
   *
   * Entries below the configured minimum level are silently skipped.
   *
   * @param entry - The log entry to output
   */
  report(entry) {
    if (entry.level < this._level) {
      return;
    }
    const hasContext = entry.context && Object.keys(entry.context).length > 0;
    switch (entry.level) {
      case LogLevel2.Debug:
        hasContext ? this.consola.debug(entry.message, entry.context) : this.consola.debug(entry.message);
        break;
      case LogLevel2.Info:
        hasContext ? this.consola.info(entry.message, entry.context) : this.consola.info(entry.message);
        break;
      case LogLevel2.Warn:
        hasContext ? this.consola.warn(entry.message, entry.context) : this.consola.warn(entry.message);
        break;
      case LogLevel2.Error:
        hasContext ? this.consola.error(entry.message, entry.context) : this.consola.error(entry.message);
        break;
      case LogLevel2.Fatal:
        hasContext ? this.consola.fatal(entry.message, entry.context) : this.consola.fatal(entry.message);
        break;
      default:
        hasContext ? this.consola.log(entry.message, entry.context) : this.consola.log(entry.message);
    }
  }
  /**
   * No-op flush — console output is immediate.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
    this.consola.level = toConsolaLevel2(level);
  }
};
ConsoleReporter2 = __decorateClass32([
  Reporter2({ name: "console" })
], ConsoleReporter2);
var LoggerService2 = class _LoggerService2 {
  constructor(configOrContext) {
    this._level = LogLevel2.Debug;
    this._sharedContext = {};
    if (typeof configOrContext === "string" || configOrContext === void 0) {
      this._mode = "facade";
      this._contextString = configOrContext;
    } else {
      this._mode = "config";
      this._config = configOrContext;
      this._reporters = configOrContext.reporters ?? [new ConsoleReporter2()];
      this._level = configOrContext.level ?? LogLevel2.Debug;
      if (configOrContext.context) {
        this._sharedContext = { ...configOrContext.context };
      }
    }
  }
  static {
    this.staticManagerRef = void 0;
  }
  /**
   * Set the static LoggerManager reference.
   * Called automatically by `LoggerModule.forRoot()` during bootstrap.
   *
   * @param manager - The bootstrapped LoggerManager instance
   */
  static overrideLogger(manager) {
    _LoggerService2.staticManagerRef = manager;
  }
  static {
    this._fallbackLoggerInstance = void 0;
  }
  /**
   * Get the fallback logger instance (created lazily on first access).
   *
   * @returns A minimal LoggerService with console output at Warn level
   */
  static get _fallbackLogger() {
    if (!_LoggerService2._fallbackLoggerInstance) {
      _LoggerService2._fallbackLoggerInstance = new _LoggerService2({
        reporters: [new ConsoleReporter2({ level: LogLevel2.Warn })]
      });
    }
    return _LoggerService2._fallbackLoggerInstance;
  }
  // ── Log methods ─────────────────────────────────────────────────────────
  /**
   * Log a message at the debug level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  debug(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("debug", message, context);
    } else {
      this.emit(LogLevel2.Debug, message, context);
    }
  }
  /**
   * Log a message at the info level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  info(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("info", message, context);
    } else {
      this.emit(LogLevel2.Info, message, context);
    }
  }
  /**
   * Log a message at the warn level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  warn(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("warn", message, context);
    } else {
      this.emit(LogLevel2.Warn, message, context);
    }
  }
  /**
   * Log a message at the error level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  error(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("error", message, context);
    } else {
      this.emit(LogLevel2.Error, message, context);
    }
  }
  /**
   * Log a message at the fatal level.
   *
   * @param message - The log message
   * @param context - Optional contextual data for this single entry
   */
  fatal(message, context = {}) {
    if (this._mode === "facade") {
      this.facadeDispatch("fatal", message, context);
    } else {
      this.emit(LogLevel2.Fatal, message, context);
    }
  }
  // ── Context management ──────────────────────────────────────────────────
  /**
   * Add persistent context merged into every future log entry.
   *
   * @param context - Key-value pairs to add to the shared context
   * @returns This instance for fluent chaining
   *
   * @example
   * ```typescript
   * logger.withContext({ requestId: 'abc-123', userId: '42' });
   * logger.info('Processing'); // includes requestId and userId
   * ```
   */
  withContext(context) {
    this._sharedContext = { ...this._sharedContext, ...context };
    return this;
  }
  /**
   * Remove keys from shared context, or clear it entirely.
   *
   * @param keys - Optional array of keys to remove. Omit to clear all.
   * @returns This instance for fluent chaining
   */
  withoutContext(keys) {
    if (!keys) {
      this._sharedContext = {};
    } else {
      for (const key of keys) {
        delete this._sharedContext[key];
      }
    }
    return this;
  }
  // ── Accessors ───────────────────────────────────────────────────────────
  /**
   * Get the reporters for this logger instance.
   *
   * @returns Array of active reporter instances
   */
  getReporters() {
    if (this._mode === "facade") {
      return this.resolveDelegate().getReporters();
    }
    return this._reporters;
  }
  /**
   * Get the configuration for this logger instance.
   *
   * @returns The ILoggerConfig, or undefined in facade mode
   */
  getConfig() {
    if (this._mode === "facade") {
      return this.resolveDelegate().getConfig();
    }
    return this._config;
  }
  // ── Private — Facade delegation ─────────────────────────────────────────
  /**
   * Resolve the delegate LoggerService for facade mode.
   * Returns the default channel from the static manager, or the fallback logger.
   *
   * @returns The resolved LoggerService to delegate calls to
   */
  resolveDelegate() {
    if (_LoggerService2.staticManagerRef) {
      return _LoggerService2.staticManagerRef.channel();
    }
    return _LoggerService2._fallbackLogger;
  }
  /**
   * Dispatch a log call in facade mode: resolve delegate, merge contexts, call method.
   *
   * @param method - The log level method name
   * @param message - The log message
   * @param callContext - Per-call context data
   */
  facadeDispatch(method, message, callContext) {
    const delegate = this.resolveDelegate();
    const mergedContext = {
      ...this._contextString !== void 0 ? { context: this._contextString } : {},
      ...this._sharedContext,
      ...callContext
    };
    delegate[method](message, mergedContext);
  }
  // ── Private — Config-mode dispatch ──────────────────────────────────────
  /**
   * Emit a log entry to all reporters in config mode.
   *
   * Each reporter is wrapped in a try-catch to prevent a failing reporter
   * from blocking other reporters or crashing the application.
   *
   * @param level - The log level
   * @param message - The log message
   * @param context - Per-call context data
   */
  emit(level, message, context) {
    if (level < this._level) {
      return;
    }
    const entry = {
      level,
      message,
      context: { ...this._sharedContext, ...context },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    for (const reporter of this._reporters) {
      try {
        reporter.report(entry);
      } catch {
      }
    }
  }
};
var SilentReporter2 = class {
  constructor() {
    this.name = "silent";
    this._level = LogLevel2.Debug;
  }
  /**
   * No-op report method. Silently discards the entry.
   *
   * @param _entry - The log entry (ignored)
   */
  report(_entry) {
  }
  /**
   * No-op flush.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
  }
};
SilentReporter2 = __decorateClass32([
  Reporter2({ name: "silent" })
], SilentReporter2);
var LoggerManager2 = class extends MultipleInstanceManager2 {
  /**
   * Create a new LoggerManager instance.
   *
   * @param config - Logger module configuration (default channel, channels map)
   */
  constructor(config) {
    super();
    this.config = config;
    this.services = /* @__PURE__ */ new Map();
  }
  // ── Lifecycle ───────────────────────────────────────────────────────────
  /**
   * Called after all providers are instantiated.
   * Eagerly creates the default channel to catch config errors early.
   * If the default channel has issues, logs a warning instead of crashing.
   */
  onModuleInit() {
    try {
      this.channel();
    } catch (err) {
      console.warn(
        `[LoggerManager] Failed to create default channel '${this.config.default}':`,
        err.message
      );
    }
  }
  /**
   * Called on `app.close()`.
   * Flushes all reporters and clears internal caches.
   */
  async onModuleDestroy() {
    for (const [, service] of this.services) {
      for (const reporter of service.getReporters()) {
        reporter.flush?.();
      }
    }
    this.services.clear();
    this.purge();
  }
  // ── MultipleInstanceManager contract ────────────────────────────────────
  /**
   * Get the default channel name from configuration.
   *
   * @returns The default channel name (e.g., "console", "combined")
   */
  getDefaultInstance() {
    return this.config.default;
  }
  /**
   * Change the default channel at runtime.
   *
   * Subsequent calls to `channel()` without a name argument will
   * resolve to the new default. Does not affect already-resolved
   * LoggerService instances.
   *
   * @param name - The new default channel name (must exist in config)
   */
  setDefaultInstance(name) {
    this.config.default = name;
  }
  /**
   * Get the configuration for a named channel.
   *
   * Adds a synthetic `driver` field so the base class can resolve it.
   * The driver name is inferred from the first reporter's class name.
   *
   * @param name - Channel name to look up
   * @returns The channel configuration with a `driver` field, or `undefined`
   */
  getInstanceConfig(name) {
    const channelConfig = this.config.channels[name];
    if (!channelConfig) return void 0;
    const driver = this.resolveDriverName(channelConfig);
    return { driver, ...channelConfig };
  }
  /**
   * Create a channel driver instance (LoggerConfig).
   *
   * Called by the base class when a channel is requested for the first time.
   * Returns the channel config with default reporters if none specified.
   *
   * @param driver - Driver name inferred from reporters
   * @param config - Raw channel configuration
   * @returns A LoggerConfig with guaranteed reporters
   */
  createDriver(driver, config) {
    const channelConfig = config;
    if (!channelConfig.reporters || channelConfig.reporters.length === 0) {
      if (driver === "silent") {
        return { ...channelConfig, reporters: [new SilentReporter2()] };
      }
      return { ...channelConfig, reporters: [new ConsoleReporter2()] };
    }
    return channelConfig;
  }
  // ── Channel access ──────────────────────────────────────────────────────
  /**
   * Get a LoggerService for a named channel.
   *
   * The primary consumer API. Returns a LoggerService wrapping the
   * channel's reporters with debug, info, warn, error, fatal methods.
   * Cached — subsequent calls return the same instance.
   *
   * @param name - Channel name. Uses default if omitted.
   * @returns A LoggerService instance for the requested channel
   *
   * @example
   * ```typescript
   * const logger = manager.channel();           // default
   * const errors = manager.channel('errors');   // named
   * ```
   */
  channel(name) {
    const channelName = name ?? this.config.default;
    const existing = this.services.get(channelName);
    if (existing) return existing;
    const channelConfig = this.instance(channelName);
    const service = new LoggerService2(channelConfig);
    this.services.set(channelName, service);
    return service;
  }
  // ── Introspection ───────────────────────────────────────────────────────
  /**
   * Get all configured channel names (from config, not just active).
   *
   * @returns Array of channel names
   */
  getChannelNames() {
    return Object.keys(this.config.channels);
  }
  /**
   * Check if a channel is configured (exists in config).
   *
   * @param name - Channel name to check
   * @returns `true` if the channel exists in configuration
   */
  hasChannel(name) {
    return name in this.config.channels;
  }
  /**
   * Check if a channel is currently active (cached and resolved).
   *
   * @param name - Channel name. Uses default if omitted.
   * @returns `true` if the channel has been resolved and cached
   */
  isChannelActive(name) {
    const channelName = name ?? this.config.default;
    return this.services.has(channelName);
  }
  // ── Channel management ──────────────────────────────────────────────────
  /**
   * Forget a cached channel and its LoggerService wrapper.
   * Forces re-creation on next `channel()` call.
   *
   * @param name - Channel name(s). Uses default if omitted.
   * @returns This instance for chaining
   */
  forgetChannel(name) {
    const names = name ? Array.isArray(name) ? name : [name] : [this.config.default];
    for (const n of names) {
      this.services.delete(n);
    }
    return this.forgetInstance(name);
  }
  /**
   * Clear all cached channels and LoggerService wrappers.
   * Forces full re-creation on next access.
   */
  purge() {
    this.services.clear();
    super.purge();
  }
  // ── Private helpers ─────────────────────────────────────────────────────
  /**
   * Resolve a driver name from channel config.
   * Used to populate the synthetic `driver` field for the base class.
   *
   * @param config - The channel configuration
   * @returns A driver name string (e.g., "console", "storage", "silent")
   */
  resolveDriverName(config) {
    if (!config.reporters || config.reporters.length === 0) {
      return "console";
    }
    const first = config.reporters[0];
    const name = Str2.lower(first.constructor.name);
    if (Str2.contains(name, "silent")) return "silent";
    if (Str2.contains(name, "storage")) return "storage";
    return "console";
  }
};
LoggerManager2 = __decorateClass32([
  Injectable3(),
  __decorateParam22(0, Inject3(LOGGER_CONFIG2))
], LoggerManager2);
var ReporterLoader2 = class {
  constructor(discoveryService, loggerManager) {
    this.discoveryService = discoveryService;
    this.loggerManager = loggerManager;
  }
  /**
   * Called after all modules are initialized.
   * Scans providers for `@Reporter` metadata and attaches them to channels.
   */
  onApplicationBootstrap() {
    this.loadReporters();
  }
  /**
   * Scan all providers for `@Reporter`-decorated classes and attach them.
   */
  loadReporters() {
    const providers = this.discoveryService.getProviders();
    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance || wrapper.isAlias) continue;
      const constructor = instance.constructor;
      if (!constructor) continue;
      const reporterOptions = getMetadata(
        REPORTER_METADATA2,
        constructor
      );
      if (!reporterOptions) continue;
      const reporter = instance;
      if (typeof reporter.report !== "function") {
        console.error(
          `[Logger] Reporter "${reporterOptions.name}" does not implement ILogReporter.report()`
        );
        continue;
      }
      if (reporterOptions.level !== void 0 && typeof reporter.setLevel === "function") {
        reporter.setLevel(reporterOptions.level);
      }
      const targetChannels = reporterOptions.channels && reporterOptions.channels.length > 0 ? reporterOptions.channels : this.loggerManager.getChannelNames();
      for (const channelName of targetChannels) {
        if (!this.loggerManager.hasChannel(channelName)) {
          console.warn(
            `[Logger] Reporter "${reporterOptions.name}" targets channel "${channelName}" which does not exist`
          );
          continue;
        }
        const channelLogger = this.loggerManager.channel(channelName);
        const existingReporters = channelLogger.getReporters();
        const alreadyAttached = existingReporters.some((r) => r.name === reporterOptions.name);
        if (!alreadyAttached) {
          existingReporters.push(reporter);
        }
      }
    }
  }
};
ReporterLoader2 = __decorateClass32([
  Injectable3()
], ReporterLoader2);
var getLoggerChannelToken2 = (channelName = "default") => `LoggerChannel:${channelName}`;
var LoggerModule2 = class {
  /**
   * Configure the logger module.
   *
   * Channels are declared in config. Reporters are auto-discovered
   * from providers decorated with `@Reporter`.
   *
   * @param config - Logger configuration with named channels
   * @returns A DynamicModule with all logger providers
   */
  static forRoot(config) {
    const channelProviders = Object.keys(config.channels).map((channelName) => ({
      provide: getLoggerChannelToken2(channelName),
      useFactory: (manager) => manager.channel(channelName),
      inject: [LoggerManager2]
    }));
    const defaultChannelProvider = {
      provide: getLoggerChannelToken2(),
      useFactory: (manager) => manager.channel(),
      inject: [LoggerManager2]
    };
    const channelTokens = [
      getLoggerChannelToken2(),
      ...Object.keys(config.channels).map(getLoggerChannelToken2)
    ];
    return {
      module: LoggerModule2,
      global: true,
      imports: [DiscoveryModule3],
      providers: [
        { provide: LOGGER_CONFIG2, useValue: config },
        { provide: LoggerManager2, useClass: LoggerManager2 },
        { provide: LOGGER_MANAGER2, useExisting: LoggerManager2 },
        ReporterLoader2,
        {
          provide: LOGGER_STATIC_REF2,
          useFactory: (manager) => {
            LoggerService2.staticManagerRef = manager;
            return manager;
          },
          inject: [LoggerManager2]
        },
        defaultChannelProvider,
        ...channelProviders
      ],
      exports: [LoggerManager2, LOGGER_MANAGER2, LOGGER_CONFIG2, ...channelTokens]
    };
  }
};
LoggerModule2 = __decorateClass32([
  Global3(),
  Module3({})
], LoggerModule2);
var Logger2 = LoggerService2;
var StorageReporter2 = class {
  /**
   * Create a new StorageReporter instance.
   *
   * @param options - Optional configuration for storage key, limits, and level
   */
  constructor(options = {}) {
    this.name = "storage";
    this._level = options.level ?? LogLevel2.Debug;
    this._key = options.key ?? "logger:entries";
    this._maxEntries = options.maxEntries ?? 100;
  }
  /**
   * Persist a log entry to localStorage.
   *
   * The entry is serialized as JSON, appended to the existing entries
   * array, and trimmed to the maximum entry limit. If localStorage is
   * unavailable or full, the error is silently swallowed.
   *
   * @param entry - The log entry to persist
   */
  report(entry) {
    if (entry.level < this._level) {
      return;
    }
    try {
      const entries = this.readEntries();
      entries.push(entry);
      while (entries.length > this._maxEntries) {
        entries.shift();
      }
      localStorage.setItem(this._key, JSON.stringify(entries));
    } catch {
    }
  }
  /**
   * No-op flush — localStorage writes are synchronous.
   */
  flush() {
  }
  /** @inheritdoc */
  getLevel() {
    return this._level;
  }
  /** @inheritdoc */
  setLevel(level) {
    this._level = level;
  }
  /**
   * Clear all stored log entries from localStorage.
   * Useful for manual cleanup or when resetting application state.
   */
  clear() {
    try {
      localStorage.removeItem(this._key);
    } catch {
    }
  }
  /**
   * Retrieve all stored log entries from localStorage.
   *
   * @returns An array of stored ILogEntry objects
   */
  getEntries() {
    return this.readEntries();
  }
  /**
   * Read the current entries array from localStorage.
   * Returns an empty array if the key does not exist or parsing fails.
   *
   * @returns The parsed entries array
   */
  readEntries() {
    try {
      const raw = localStorage.getItem(this._key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};
StorageReporter2 = __decorateClass32([
  Reporter2({ name: "storage" })
], StorageReporter2);
inject3(LoggerManager2);
var EventEmitterError = class extends Error {
  /** Error name visible in stack traces and logs. */
  name = "EventEmitterError";
  /** Machine-readable error code for programmatic handling. */
  code = "EVENT_EMITTER_ERROR";
  /** Optional underlying cause. */
  cause;
  /**
   * @param message - Human-readable error message.
   * @param cause   - Optional underlying error.
   */
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(
        this,
        this.constructor
      );
    }
  }
};
var EventTransportError = class extends EventEmitterError {
  name = "EventTransportError";
  code = "EVENT_TRANSPORT_ERROR";
};
var EventEmitter = class {
  /** Scoped logger for diagnostics (max-listener warnings, ...). */
  logger = new Logger2(EventEmitter.name);
  /** Map of exact event names to their listener arrays. */
  listeners = /* @__PURE__ */ new Map();
  /** Whether wildcard matching is enabled. */
  wildcard;
  /** Segment delimiter for wildcard matching. */
  delimiter;
  /** Max listeners per event before warning. `0` disables the warning. */
  maxListeners;
  /**
   * @param options - Configuration injected via `EVENT_EMITTER_CONFIG`.
   *   Optional so the emitter can be constructed manually in tests.
   */
  constructor(options) {
    const opts = options ?? {};
    this.wildcard = opts.wildcard ?? false;
    this.delimiter = opts.delimiter ?? ".";
    this.maxListeners = opts.maxListeners ?? 10;
  }
  // ────────────────────────────────────────────────────────────────────
  // Subscription
  // ────────────────────────────────────────────────────────────────────
  /** @inheritdoc */
  on(event, listener) {
    this.addListener(event, listener, false, false);
    return this;
  }
  /** @inheritdoc */
  once(event, listener) {
    this.addListener(event, listener, true, false);
    return this;
  }
  /** @inheritdoc */
  prependListener(event, listener) {
    this.addListener(event, listener, false, true);
    return this;
  }
  /** @inheritdoc */
  off(event, listener) {
    const entries = this.listeners.get(event);
    if (!entries) return this;
    const index = entries.findIndex((entry) => entry.fn === listener);
    if (index !== -1) {
      entries.splice(index, 1);
    }
    if (entries.length === 0) {
      this.listeners.delete(event);
    }
    return this;
  }
  /** @inheritdoc */
  removeAllListeners(event) {
    if (event !== void 0) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
    return this;
  }
  // ────────────────────────────────────────────────────────────────────
  // Dispatch
  // ────────────────────────────────────────────────────────────────────
  /** @inheritdoc */
  emit(event, ...args) {
    const matches = this.getMatchingEntries(event);
    if (matches.length === 0) return false;
    for (const { entry, key, isWildcard } of matches) {
      try {
        if (isWildcard) {
          entry.fn(event, ...args);
        } else {
          entry.fn(...args);
        }
      } catch (err) {
        this.logger.warn(
          `[EventEmitter] Listener for "${String(event)}" threw: ${err.message}`
        );
      }
      if (entry.once) {
        this.removeEntry(key, entry);
      }
    }
    return true;
  }
  /** @inheritdoc */
  async emitAsync(event, ...args) {
    const matches = this.getMatchingEntries(event);
    const results = [];
    for (const { entry, key, isWildcard } of matches) {
      try {
        const result = isWildcard ? await entry.fn(event, ...args) : await entry.fn(...args);
        results.push(result);
      } catch (err) {
        this.logger.warn(
          `[EventEmitter] Async listener for "${String(event)}" threw: ${err.message}`
        );
        results.push(void 0);
      }
      if (entry.once) {
        this.removeEntry(key, entry);
      }
    }
    return results;
  }
  // ────────────────────────────────────────────────────────────────────
  // Introspection
  // ────────────────────────────────────────────────────────────────────
  /** @inheritdoc */
  listenerCount(event) {
    if (this.wildcard && typeof event === "string") {
      return this.getMatchingEntries(event).length;
    }
    return this.listeners.get(event)?.length ?? 0;
  }
  /** @inheritdoc */
  eventNames() {
    return [...this.listeners.keys()];
  }
  // ────────────────────────────────────────────────────────────────────
  // Private
  // ────────────────────────────────────────────────────────────────────
  /**
   * Add a listener entry to the internal map.
   *
   * @param event    - Event name or symbol.
   * @param listener - Callback to register.
   * @param once     - Whether the listener auto-removes after first dispatch.
   * @param prepend  - Whether to insert at the front of the array.
   */
  addListener(event, listener, once, prepend) {
    let entries = this.listeners.get(event);
    if (!entries) {
      entries = [];
      this.listeners.set(event, entries);
    }
    const entry = { fn: listener, once };
    if (prepend) {
      entries.unshift(entry);
    } else {
      entries.push(entry);
    }
    if (this.maxListeners > 0 && entries.length > this.maxListeners) {
      this.logger.warn(
        `[EventEmitter] Possible memory leak: ${entries.length} listeners for "${String(event)}". Max is ${this.maxListeners}.`
      );
    }
  }
  /**
   * Remove a specific entry from the listener map.
   *
   * @param event - The event the entry belongs to.
   * @param entry - The entry to remove.
   */
  removeEntry(event, entry) {
    const entries = this.listeners.get(event);
    if (!entries) return;
    const index = entries.indexOf(entry);
    if (index !== -1) {
      entries.splice(index, 1);
    }
    if (entries.length === 0) {
      this.listeners.delete(event);
    }
  }
  /**
   * Find every listener entry that matches a dispatched event,
   * including wildcard matches when wildcard mode is enabled.
   *
   * @param event - The dispatched event name.
   * @returns Array of matched entries (literal first, then wildcards).
   */
  getMatchingEntries(event) {
    const results = [];
    const exact = this.listeners.get(event);
    if (exact) {
      for (const entry of [...exact]) {
        results.push({ entry, key: event, isWildcard: false });
      }
    }
    if (this.wildcard && typeof event === "string") {
      for (const [pattern, entries] of this.listeners) {
        if (pattern === event) continue;
        if (typeof pattern !== "string") continue;
        if (this.matchesWildcard(pattern, event)) {
          for (const entry of [...entries]) {
            results.push({ entry, key: pattern, isWildcard: true });
          }
        }
      }
    }
    return results;
  }
  /**
   * Whether a wildcard pattern matches a dispatched event name.
   *
   * Supports:
   *
   * - `*`  — matches exactly one segment.
   * - `**` — matches one or more segments.
   *
   * @param pattern - Listener pattern (e.g. `"user.*"`, `"app.**"`).
   * @param event   - Dispatched event name (e.g. `"user.created"`).
   * @returns `true` when the pattern matches the event.
   */
  matchesWildcard(pattern, event) {
    const patternParts = pattern.split(this.delimiter);
    const eventParts = event.split(this.delimiter);
    return this.matchParts(patternParts, 0, eventParts, 0);
  }
  /**
   * Recursive wildcard matching helper.
   *
   * @param pattern - Pattern segment array.
   * @param pi      - Pattern index.
   * @param event   - Event segment array.
   * @param ei      - Event index.
   * @returns `true` when the remaining segments match.
   */
  matchParts(pattern, pi, event, ei) {
    if (pi === pattern.length && ei === event.length) return true;
    if (pi === pattern.length) return false;
    const segment = pattern[pi];
    if (segment === "**") {
      for (let skip = 1; skip <= event.length - ei; skip++) {
        if (this.matchParts(pattern, pi + 1, event, ei + skip)) {
          return true;
        }
      }
      return false;
    }
    if (ei === event.length) return false;
    if (segment === "*") {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }
    if (segment === event[ei]) {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }
    return false;
  }
};
EventEmitter = __decorateClass4([
  Injectable3(),
  __decorateParam3(0, Optional2()),
  __decorateParam3(0, Inject3(EVENT_EMITTER_CONFIG))
], EventEmitter);
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
var EventEmitterReadinessWatcher = class {
  /** Internal triple. */
  readyPromise = promiseWithResolvers();
  /** @inheritdoc */
  waitUntilReady() {
    return this.readyPromise.promise;
  }
  /** @inheritdoc */
  setReady() {
    this.readyPromise.resolve();
  }
  /** @inheritdoc */
  setErrored(error) {
    this.readyPromise.reject(error);
  }
};
EventEmitterReadinessWatcher = __decorateClass4([
  Injectable3()
], EventEmitterReadinessWatcher);
var EventTransportRegistry = class {
  /** Active transports keyed by name. */
  transports = /* @__PURE__ */ new Map();
  /** @inheritdoc */
  register(name, transport) {
    this.transports.set(name, transport);
  }
  /** @inheritdoc */
  disconnect(name) {
    const transport = this.transports.get(name);
    if (!transport) return;
    transport.disconnect();
    this.transports.delete(name);
  }
  /** @inheritdoc */
  disconnectAll() {
    for (const [, transport] of this.transports) {
      transport.disconnect();
    }
    this.transports.clear();
  }
  /** @inheritdoc */
  has(name) {
    return this.transports.has(name);
  }
  /** @inheritdoc */
  getNames() {
    return [...this.transports.keys()];
  }
  /** @inheritdoc */
  get(name) {
    return this.transports.get(name);
  }
};
EventTransportRegistry = __decorateClass4([
  Injectable3()
], EventTransportRegistry);
var EVENT_LISTENER_METADATA = "EVENT_LISTENER_METADATA";
var EVENT_TRANSPORT_METADATA = "EVENT_TRANSPORT_METADATA";
var EventsMetadataAccessor = class {
  /**
   * Read the event-handler metadata for a given method.
   *
   * @param target - Method function or descriptor to inspect.
   * @returns Array of metadata entries, or `undefined` when the
   *   method isn't decorated.
   */
  getEventHandlerMetadata(target) {
    if (!target || typeof target !== "function" && typeof target !== "object") {
      return void 0;
    }
    const metadata = getMetadata(
      EVENT_LISTENER_METADATA,
      target
    );
    if (!metadata) return void 0;
    return Array.isArray(metadata) ? metadata : [metadata];
  }
};
EventsMetadataAccessor = __decorateClass4([
  Injectable3()
], EventsMetadataAccessor);
var EventSubscribersLoader = class {
  /**
   * @param discoveryService - DI provider walker.
   * @param eventEmitter     - The active `IEventEmitter`.
   * @param metadataAccessor - Reads `@OnEvent` metadata.
   * @param readinessWatcher - Notified when bootstrap finishes.
   * @param transportRegistry - Tracks connected transports.
   */
  constructor(discoveryService, eventEmitter, metadataAccessor, readinessWatcher, transportRegistry) {
    this.discoveryService = discoveryService;
    this.eventEmitter = eventEmitter;
    this.metadataAccessor = metadataAccessor;
    this.readinessWatcher = readinessWatcher;
    this.transportRegistry = transportRegistry;
  }
  discoveryService;
  eventEmitter;
  metadataAccessor;
  readinessWatcher;
  transportRegistry;
  /** Scoped logger. */
  logger = new Logger2(EventSubscribersLoader.name);
  /**
   * Run the discovery pass. Called once at application bootstrap.
   */
  onApplicationBootstrap() {
    try {
      this.loadEventListeners();
      this.loadEventTransports();
      this.readinessWatcher.setReady();
    } catch (err) {
      this.readinessWatcher.setErrored(err);
      throw err;
    }
  }
  /**
   * Disconnect every transport and clear every listener.
   */
  onApplicationShutdown() {
    this.transportRegistry.disconnectAll();
    this.eventEmitter.removeAllListeners();
  }
  // ────────────────────────────────────────────────────────────────────
  // Private — listener discovery
  // ────────────────────────────────────────────────────────────────────
  /**
   * Walk every provider and register every `@OnEvent`-tagged method.
   */
  loadEventListeners() {
    const providers = this.discoveryService.getProviders();
    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance || wrapper.isAlias) continue;
      const prototype = Object.getPrototypeOf(instance);
      if (!prototype) continue;
      const methodNames = this.getAllMethodNames(prototype);
      for (const methodKey of methodNames) {
        this.subscribeToEventIfListener(instance, methodKey);
      }
    }
  }
  /**
   * Subscribe a method to its `@OnEvent` event(s) when metadata is
   * present.
   *
   * @param instance  - The provider instance owning the method.
   * @param methodKey - Method property name on the instance.
   */
  subscribeToEventIfListener(instance, methodKey) {
    const method = instance[methodKey];
    if (typeof method !== "function") return;
    const metadatas = this.metadataAccessor.getEventHandlerMetadata(method);
    if (!metadatas) return;
    for (const metadata of metadatas) {
      const { event, options } = metadata;
      const events = Array.isArray(event) ? event : [event];
      for (const eventName of events) {
        const listenerFn = (...args) => this.wrapInTryCatch(instance, methodKey, args, options);
        if (options?.once) {
          this.eventEmitter.once(eventName, listenerFn);
        } else if (options?.prependListener) {
          this.eventEmitter.prependListener(eventName, listenerFn);
        } else {
          this.eventEmitter.on(eventName, listenerFn);
        }
      }
    }
  }
  // ────────────────────────────────────────────────────────────────────
  // Private — transport discovery
  // ────────────────────────────────────────────────────────────────────
  /**
   * Walk every provider and connect every `@EventTransport`-tagged
   * class.
   */
  loadEventTransports() {
    const providers = this.discoveryService.getProviders();
    for (const wrapper of providers) {
      const { instance } = wrapper;
      if (!instance || wrapper.isAlias) continue;
      const ctor = instance.constructor;
      if (!ctor) continue;
      const transportOptions = getMetadata(
        EVENT_TRANSPORT_METADATA,
        ctor
      );
      if (!transportOptions) continue;
      const transport = instance;
      if (typeof transport.connect !== "function") {
        throw new EventTransportError(
          `[EventSubscribersLoader] Transport "${transportOptions.name}" does not implement IEventTransport.connect().`
        );
      }
      transport.connect(this.eventEmitter);
      this.transportRegistry.register(transportOptions.name, transport);
    }
  }
  // ────────────────────────────────────────────────────────────────────
  // Private — helpers
  // ────────────────────────────────────────────────────────────────────
  /**
   * Invoke a method, optionally suppressing thrown errors.
   *
   * @param instance  - Provider instance owning the method.
   * @param methodKey - Method name on the instance.
   * @param args      - Arguments forwarded to the method.
   * @param options   - Listener options (used for error suppression).
   * @returns The method's return value.
   */
  async wrapInTryCatch(instance, methodKey, args, options) {
    try {
      const method = instance[methodKey];
      return await method.call(instance, ...args);
    } catch (err) {
      if (options?.suppressErrors ?? true) {
        this.logger.error(
          `[EventSubscribersLoader] Listener "${methodKey}" threw: ${err.message}`
        );
        return void 0;
      }
      throw err;
    }
  }
  /**
   * Read every method name on a prototype, excluding the constructor.
   *
   * @param prototype - Prototype object to inspect.
   * @returns Array of method names.
   */
  getAllMethodNames(prototype) {
    const methods = [];
    const descriptors = Object.getOwnPropertyDescriptors(prototype);
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (key === "constructor") continue;
      if (typeof descriptor.value === "function") {
        methods.push(key);
      }
    }
    return methods;
  }
};
EventSubscribersLoader = __decorateClass4([
  Injectable3(),
  __decorateParam3(1, Inject3(EVENT_EMITTER))
], EventSubscribersLoader);
var EventEmitterModule = class {
  // ────────────────────────────────────────────────────────────────────
  // forRoot
  // ────────────────────────────────────────────────────────────────────
  /**
   * Configure the events module statically.
   *
   * Registers:
   *
   * - `EVENT_EMITTER_CONFIG` — the raw `IEventEmitterModuleOptions`.
   * - `EventEmitter` and `EVENT_EMITTER` alias.
   * - `EventEmitterReadinessWatcher` and the
   *   `EVENT_EMITTER_READINESS_WATCHER` alias token.
   * - `EventTransportRegistry` and the `EVENT_TRANSPORT_REGISTRY`
   *   alias token.
   * - `EventsMetadataAccessor` (read-only metadata helper).
   * - `EventSubscribersLoader` (bootstrap-time subscriber/transport wiring).
   *
   * @param options - Optional configuration. Defaults to `{}` —
   *   wildcard off, default delimiter, max listeners 10, global true.
   * @returns A dynamic module wiring every provider.
   *
   * @example
   * ```typescript
   * @Module({
   *   imports: [
   *     EventEmitterModule.forRoot({
   *       wildcard: true,
   *       delimiter: '.',
   *       maxListeners: 20,
   *     }),
   *   ],
   * })
   * export class AppModule {}
   * ```
   */
  static forRoot(options) {
    const config = options ?? {};
    EventEmitterModule.validate(config);
    return {
      module: EventEmitterModule,
      global: config.global ?? true,
      imports: [DiscoveryModule3],
      providers: [
        // Config
        { provide: EVENT_EMITTER_CONFIG, useValue: config },
        // Emitter
        EventEmitter,
        { provide: EVENT_EMITTER, useExisting: EventEmitter },
        // Readiness watcher
        EventEmitterReadinessWatcher,
        {
          provide: EVENT_EMITTER_READINESS_WATCHER,
          useExisting: EventEmitterReadinessWatcher
        },
        // Transport registry
        EventTransportRegistry,
        { provide: EVENT_TRANSPORT_REGISTRY, useExisting: EventTransportRegistry },
        // Bootstrap support
        EventsMetadataAccessor,
        EventSubscribersLoader
      ],
      exports: [
        EVENT_EMITTER_CONFIG,
        EventEmitter,
        EVENT_EMITTER,
        EventEmitterReadinessWatcher,
        EVENT_EMITTER_READINESS_WATCHER,
        EventTransportRegistry,
        EVENT_TRANSPORT_REGISTRY
      ]
    };
  }
  // ────────────────────────────────────────────────────────────────────
  // forRootAsync
  // ────────────────────────────────────────────────────────────────────
  /**
   * Configure the events module asynchronously.
   *
   * Useful when configuration depends on a DI-resolved dependency
   * (a config service, a feature flag service, ...).
   *
   * @param options - Async options carrying `useFactory` / `inject`.
   * @returns A dynamic module wiring every provider.
   */
  static forRootAsync(options) {
    if (!options.useFactory) {
      EventEmitterModule.logger.warn("[EventEmitterModule] forRootAsync requires useFactory.");
      return { module: EventEmitterModule, providers: [], exports: [] };
    }
    return {
      module: EventEmitterModule,
      global: options.global ?? true,
      imports: [DiscoveryModule3, ...options.imports ?? []],
      providers: [
        {
          provide: EVENT_EMITTER_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject ?? []
        },
        EventEmitter,
        { provide: EVENT_EMITTER, useExisting: EventEmitter },
        EventEmitterReadinessWatcher,
        {
          provide: EVENT_EMITTER_READINESS_WATCHER,
          useExisting: EventEmitterReadinessWatcher
        },
        EventTransportRegistry,
        { provide: EVENT_TRANSPORT_REGISTRY, useExisting: EventTransportRegistry },
        EventsMetadataAccessor,
        EventSubscribersLoader
      ],
      exports: [
        EVENT_EMITTER_CONFIG,
        EventEmitter,
        EVENT_EMITTER,
        EventEmitterReadinessWatcher,
        EVENT_EMITTER_READINESS_WATCHER,
        EventTransportRegistry,
        EVENT_TRANSPORT_REGISTRY
      ]
    };
  }
  // ────────────────────────────────────────────────────────────────────
  // Internal — config validation
  // ────────────────────────────────────────────────────────────────────
  /**
   * Validate static configuration so misconfiguration surfaces as a
   * clear error at bootstrap rather than as a confusing runtime
   * failure on first use.
   *
   * @param config - The configuration to validate.
   */
  static validate(config) {
    if (config.maxListeners !== void 0 && config.maxListeners < 0) {
      throw new EventEmitterError(
        "[EventEmitterModule] maxListeners must be a non-negative integer."
      );
    }
    if (config.delimiter !== void 0 && config.delimiter.length === 0) {
      throw new EventEmitterError("[EventEmitterModule] delimiter must be a non-empty string.");
    }
  }
};
__publicField(EventEmitterModule, "logger", new Logger2(EventEmitterModule.name));
EventEmitterModule = __decorateClass4([
  Global3(),
  Module3({})
], EventEmitterModule);
function EventTransport(options) {
  return (target) => {
    defineMetadata(EVENT_TRANSPORT_METADATA, options, target);
  };
}

// src/services/coordinator-transport.service.ts
exports.CoordinatorTransport = class CoordinatorTransport {
  constructor(config = {}) {
    this.logger = new Logger(exports.CoordinatorTransport.name);
    /** BroadcastChannel for event relay. */
    this.channel = null;
    /** Reference to the local EventEmitter. */
    this.emitter = null;
    /** Original emit function (stored for restoration on disconnect). */
    this.originalEmit = null;
    /** Whether we're currently processing an incoming message (prevents re-broadcast). */
    this.receiving = false;
    this.senderId = this.generateId();
    this.patterns = config.broadcastPatterns ?? [
      "sync:**",
      "auth:**",
      "state:**"
    ];
    this.enabled = config.broadcastEvents ?? true;
    this.channelName = config.channelName ?? "stackra-coordinator";
  }
  /**
   * Connect to the event bus. Called by `EventSubscribersLoader` at bootstrap.
   *
   * Sets up:
   * - BroadcastChannel listener for incoming events from other tabs
   * - Hooks into the emitter to broadcast matching outgoing events
   */
  connect(emitter) {
    if (!this.enabled) return;
    if (typeof BroadcastChannel === "undefined") return;
    this.emitter = emitter;
    this.channel = new BroadcastChannel(`${this.channelName}:events`);
    this.channel.onmessage = (event) => {
      const { eventName, args, senderId } = event.data;
      if (senderId === this.senderId) return;
      this.receiving = true;
      try {
        this.emitter.emit(eventName, ...args);
      } finally {
        this.receiving = false;
      }
    };
    this.hookEmitter(emitter);
    this.logger.info(
      `[CoordinatorTransport] Connected with patterns: ${this.patterns.join(", ")}`
    );
  }
  /**
   * Disconnect the transport. Called during application shutdown.
   *
   * Restores the original emit method and closes the BroadcastChannel.
   */
  disconnect() {
    if (this.emitter && this.originalEmit) {
      this.emitter.emit = this.originalEmit;
      this.originalEmit = null;
    }
    this.channel?.close();
    this.channel = null;
    this.emitter = null;
  }
  /**
   * Lifecycle hook — called by the DI container on module destroy.
   */
  onModuleDestroy() {
    this.disconnect();
  }
  /**
   * Hook into the emitter to intercept outgoing events.
   *
   * Wraps the emitter's `emit` method to broadcast matching events
   * to other tabs via BroadcastChannel. Stores the original for
   * restoration on disconnect.
   */
  hookEmitter(emitter) {
    const typedEmitter = emitter;
    this.originalEmit = typedEmitter.emit.bind(typedEmitter);
    const originalEmit = this.originalEmit;
    typedEmitter.emit = (event, ...args) => {
      const result = originalEmit(event, ...args);
      if (!this.receiving && typeof event === "string" && this.matchesPatterns(event)) {
        this.broadcast(event, args);
      }
      return result;
    };
  }
  /**
   * Broadcast an event to other tabs.
   */
  broadcast(eventName, args) {
    if (!this.channel) return;
    try {
      const message = {
        eventName,
        args: this.serializeArgs(args),
        senderId: this.senderId
      };
      this.channel.postMessage(message);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      this.logger.warn(
        `[CoordinatorTransport] Failed to broadcast "${eventName}": ${msg}`
      );
    }
  }
  /**
   * Check if an event name matches any of the configured broadcast patterns.
   */
  matchesPatterns(eventName) {
    return this.patterns.some(
      (pattern) => this.matchWildcard(pattern, eventName)
    );
  }
  /**
   * Simple wildcard matching.
   * - `*` matches one segment (delimited by `:`)
   * - `**` matches one or more segments
   */
  matchWildcard(pattern, event) {
    const patternParts = pattern.split(":");
    const eventParts = event.split(":");
    return this.matchParts(patternParts, 0, eventParts, 0);
  }
  matchParts(pattern, pi, event, ei) {
    if (pi === pattern.length && ei === event.length) return true;
    if (pi === pattern.length) return false;
    const segment = pattern[pi];
    if (segment === "**") {
      for (let skip = 1; skip <= event.length - ei; skip++) {
        if (this.matchParts(pattern, pi + 1, event, ei + skip)) return true;
      }
      return false;
    }
    if (ei === event.length) return false;
    if (segment === "*") {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }
    if (segment === event[ei]) {
      return this.matchParts(pattern, pi + 1, event, ei + 1);
    }
    return false;
  }
  /**
   * Attempt to serialize args for structured clone.
   * Strips non-serializable values (functions, symbols, etc.).
   */
  serializeArgs(args) {
    try {
      return JSON.parse(JSON.stringify(args));
    } catch {
      return [];
    }
  }
  generateId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};
exports.CoordinatorTransport = __decorateClass([
  EventTransport({ name: "coordinator" }),
  Injectable(),
  __decorateParam(0, Optional()),
  __decorateParam(0, Inject(COORDINATOR_CONFIG))
], exports.CoordinatorTransport);

// src/coordinator.module.ts
exports.CoordinatorModule = class CoordinatorModule {
  /**
   * Configure the coordinator module with static options.
   *
   * Call once in your root module. Registers the TabCoordinator,
   * LockManager, and CoordinatorTransport globally.
   *
   * @param config - Coordinator configuration options
   * @returns A DynamicModule with all coordinator providers
   */
  static forRoot(config = {}) {
    return {
      module: exports.CoordinatorModule,
      global: true,
      providers: [
        // Configuration
        { provide: COORDINATOR_CONFIG, useValue: config },
        // Core services
        { provide: exports.TabCoordinator, useClass: exports.TabCoordinator },
        { provide: TAB_COORDINATOR, useExisting: exports.TabCoordinator },
        // Lock manager
        { provide: exports.LockManager, useClass: exports.LockManager },
        { provide: TAB_LOCK_MANAGER, useExisting: exports.LockManager },
        // Event transport (auto-discovered by ts-events via @EventTransport)
        ...config.broadcastEvents !== false ? [exports.CoordinatorTransport] : []
      ],
      exports: [
        exports.TabCoordinator,
        TAB_COORDINATOR,
        exports.LockManager,
        TAB_LOCK_MANAGER,
        COORDINATOR_CONFIG
      ]
    };
  }
  /**
   * Configure the coordinator module with async options.
   *
   * Use when configuration needs to be resolved asynchronously
   * (e.g., from a remote config service, IndexedDB, or API).
   *
   * @param options - Async configuration options with factory
   * @returns A DynamicModule with all coordinator providers
   */
  static forRootAsync(options) {
    return {
      module: exports.CoordinatorModule,
      global: true,
      providers: [
        // Async configuration factory
        {
          provide: COORDINATOR_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject ?? []
        },
        // Core services
        { provide: exports.TabCoordinator, useClass: exports.TabCoordinator },
        { provide: TAB_COORDINATOR, useExisting: exports.TabCoordinator },
        // Lock manager
        { provide: exports.LockManager, useClass: exports.LockManager },
        { provide: TAB_LOCK_MANAGER, useExisting: exports.LockManager },
        // Event transport (always included for async — can't check config statically)
        exports.CoordinatorTransport
      ],
      exports: [
        exports.TabCoordinator,
        TAB_COORDINATOR,
        exports.LockManager,
        TAB_LOCK_MANAGER,
        COORDINATOR_CONFIG
      ]
    };
  }
};
exports.CoordinatorModule = __decorateClass([
  Global(),
  Module({})
], exports.CoordinatorModule);

// src/decorators/inject-coordinator.decorator.ts
var InjectCoordinator = () => Inject(TAB_COORDINATOR);

// src/decorators/inject-lock-manager.decorator.ts
var InjectLockManager = () => Inject(TAB_LOCK_MANAGER);
function useIsLeader() {
  const [isLeader, setIsLeader] = react.useState(false);
  react.useEffect(() => {
    const coordinator2 = inject(TAB_COORDINATOR);
    setIsLeader(coordinator2.isLeader());
    const subscription = coordinator2.role$.subscribe((role) => {
      setIsLeader(role === "leader");
    });
    return () => subscription.unsubscribe();
  }, []);
  return isLeader;
}
function useTabCount() {
  const [count, setCount] = react.useState(1);
  react.useEffect(() => {
    const coordinator2 = inject(TAB_COORDINATOR);
    setCount(coordinator2.getTabCount());
    const subscription = coordinator2.tabCount$.subscribe((newCount) => {
      setCount(newCount);
    });
    return () => subscription.unsubscribe();
  }, []);
  return count;
}

// src/facades/coordinator.facade.ts
var coordinator = inject(TAB_COORDINATOR);

// src/facades/lock.facade.ts
var lock = inject(TAB_LOCK_MANAGER);

// src/utils/define-config.util.ts
function defineConfig(config) {
  return config;
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

@stackra/ts-logger/dist/index.js:
  (**
   * @stackra/ts-logger v1.0.0
   * (c) 2026 [object Object]
   * @license MIT
   *)

@stackra/ts-logger/dist/index.js:
  (*! Bundled license information:
  
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
  
  @stackra/ts-support/dist/index.js:
    (**
     * @stackra/ts-support v2.7.0
     * (c) 2026 [object Object]
     * @license MIT
     *)
  *)

@stackra/ts-events/dist/index.js:
  (*! Bundled license information:
  
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
  
  @stackra/ts-support/dist/index.js:
    (**
     * @stackra/ts-support v2.7.0
     * (c) 2026 [object Object]
     * @license MIT
     *)
  
  @stackra/ts-logger/dist/index.js:
    (**
     * @stackra/ts-logger v1.0.0
     * (c) 2026 [object Object]
     * @license MIT
     *)
  *)
*/

exports.COORDINATOR_CONFIG = COORDINATOR_CONFIG;
exports.CoordinatorError = CoordinatorError;
exports.InjectCoordinator = InjectCoordinator;
exports.InjectLockManager = InjectLockManager;
exports.TAB_COORDINATOR = TAB_COORDINATOR;
exports.TAB_LOCK_MANAGER = TAB_LOCK_MANAGER;
exports.coordinator = coordinator;
exports.defineConfig = defineConfig;
exports.lock = lock;
exports.useIsLeader = useIsLeader;
exports.useTabCount = useTabCount;
