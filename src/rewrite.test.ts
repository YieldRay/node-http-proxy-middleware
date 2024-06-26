import { describe, it } from "node:test";
import * as assert from "node:assert";
import { rewriteLocation } from "./rewrite.ts";

describe("rewriteLocation", () => {
    it("strategy redirect", () => {
        assert.equal(
            rewriteLocation({
                strategy: "redirect",
                base: "/npm/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "/npm/pkg@1.0.0",
            }),
            "https://cdn.jsdelivr.net/npm/pkg@1.0.0"
        );
    });

    it("strategy rewrite", () => {
        assert.equal(
            rewriteLocation({
                strategy: "rewrite",
                base: "/npm/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "/npm/pkg@1.0.0",
            }),
            "/npm/pkg@1.0.0"
        );

        assert.equal(
            rewriteLocation({
                strategy: "rewrite",
                base: "/npm/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "pkg@1.0.0",
            }),
            "/npm/pkg@1.0.0"
        );

        assert.equal(
            rewriteLocation({
                strategy: "rewrite",
                base: "/jsd/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "/external/pkg@1.0.0",
            }),
            "https://cdn.jsdelivr.net/external/pkg@1.0.0"
        );

        assert.equal(
            rewriteLocation({
                strategy: "rewrite",
                base: "/jsd/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "/npm/pkg@1.0.0",
            }),
            "/jsd/pkg@1.0.0"
        );

        assert.equal(
            rewriteLocation({
                strategy: "rewrite",
                base: "/jsd/",
                target: "https://cdn.jsdelivr.net/npm/",
                url: "https://cdn.jsdelivr.net/npm/pkg",
                location: "pkg@1.0.0",
            }),
            "/jsd/pkg@1.0.0"
        );
    });
});
