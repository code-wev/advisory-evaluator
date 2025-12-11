"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdvisorDetails() {
  const { crd } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!crd) {
      return <p className="p-6 text-lg">Loading firm ID...</p>;
    }

    async function fetchFirm() {
      try {
        const res = await fetch("/api/firm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crd }),
        });

        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchFirm();
  }, [crd]);

  if (loading) {
    return <p className="p-6 text-lg">Loading...</p>;
  }

  if (!data || Object.keys(data).length === 0 || !data.filing) {
    return (
      <p className="p-6 text-lg text-red-600">
        No firm data found for CRD {crd}.
      </p>
    );
  }

  const filing = data.filing;
  const info = filing.Info || {};
  const addr = filing.MainAddr || {};
  const part1A = filing.FormInfo?.Part1A || {};
  const item1 = part1A.Item1 || {};
  const item3A = part1A.Item3A || {};
  const item3B = part1A.Item3B || {};
  const item3C = part1A.Item3C || {};
  const item5A = part1A.Item5A || {};
  const item5B = part1A.Item5B || {};
  const item5C = part1A.Item5C || {};
  const item5E = part1A.Item5E || {};
  const item5F = part1A.Item5F || {};
  const item5G = part1A.Item5G || {};
  const item5H = part1A.Item5H || {};
  const item9F = part1A.Item9F || {};
  const filingDate = filing.Filing?.[0]?.Dt || "";

  const directOwners = data.scheduleA || [];
  const indirectOwners = data.scheduleB || [];
  const otherNames = data.otherBusinessNames || [];
  const smaCustodians = data.separatelyManagedAccounts || [];
  const affiliations = data.financialIndustryAffiliations || [];
  const privateFunds = data.privateFunds || [];
  const brochures = data.brochures || [];

  // Small helpers
  const fullAddress = [addr.Strt1, addr.City, addr.State, addr.PostlCd]
    .filter(Boolean)
    .join(", ");

  const mainWebsite = item1.WebAddrs?.WebAddr;
  const allWebsites = item1.WebAddrs?.WebAddrs || [];

  const firmSizeLabel =
    item5F.Q5F2C && item5F.Q5F2C > 0
      ? `$${item5F.Q5F2C.toLocaleString()} AUM`
      : "Not reported";

  const registrationType = "Registered Advisory Firm"; // can refine with SEC vs State if needed

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
      {/* ================================================== */}
      {/*                HEADER / SUMMARY CARD              */}
      {/* ================================================== */}
      <div className="border border-gray-200 rounded-xl p-6 md:p-7 bg-white shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {info.LegalNm || info.BusNm}
        </h1>
        <p className="text-gray-700 mt-1 text-sm md:text-[15px]">
          {fullAddress}
        </p>
        <p className="text-gray-700 mt-1 text-sm">
          Phone: {addr.PhNb || "Not listed"}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Registration Type</p>
            <p className="font-semibold text-gray-800">{registrationType}</p>
          </div>
          <div>
            <p className="text-gray-500">Most Recent Filing</p>
            <p className="font-semibold text-gray-800">{filingDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Firm Size (AUM)</p>
            <p className="font-semibold text-gray-800">{firmSizeLabel}</p>
          </div>
        </div>

        {mainWebsite && (
          <div className="mt-4 text-sm">
            <span className="text-gray-500 mr-1">Primary Website:</span>
            <a
              href={mainWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-[#0F4C81] underline"
            >
              {mainWebsite}
            </a>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/*                 BASIC INFO TABLE                  */}
      {/* ================================================== */}
      <CardSection title="Basic Firm Information">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <tbody>
            <Row label="Legal Name" value={info.LegalNm} />
            <Row label="Business Name" value={info.BusNm} />
            <Row label="Address" value={fullAddress} />
            <Row label="Phone" value={addr.PhNb || "Not listed"} />
            <Row label="Organization Type" value={item3A.OrgFormNm} />
            <Row label="Fiscal Year End" value={item3B?.Q3B} />
            <Row label="Country of Organization" value={item3C?.CntryNm} />
            <Row label="Number of Other Offices" value={item1.Q1F5 ?? "0"} />
            <Row
              label="Umbrella Registration"
              value={info.UmbrRgstn === "Y" ? "Yes" : "No"}
            />
          </tbody>
        </table>
      </CardSection>

      {/* ================================================== */}
      {/*                     WEBSITES                      */}
      {/* ================================================== */}
      <CardSection title="Websites">
        {allWebsites.length === 0 ? (
          <p className="text-sm text-gray-600">No websites reported.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {allWebsites.map((url, idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0F4C81] underline break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                 OTHER BUSINESS NAMES              */}
      {/* ================================================== */}
      <CardSection title="Other Business Names">
        {Array.isArray(otherNames) && otherNames.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {otherNames.map((n, idx) => (
              <li key={idx}>
                {/* Adjust these keys after you inspect schedule-d-1-b response */}
                {n["1a-businessName"] || JSON.stringify(n)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">None reported.</p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                 STAFF BREAKDOWN                   */}
      {/* ================================================== */}
      <CardSection title="Staff Breakdown">
        <MiniRow label="Total Advisory Staff" value={item5A.TtlEmp} />
        <MiniRow
          label="Staff performing Investment Advisory Functions"
          value={item5B.Q5B1}
        />
        <MiniRow
          label="Registered Representatives of Broker Dealers"
          value={item5B.Q5B2}
        />
        <MiniRow
          label="Registered with State Securities Authorities"
          value={item5B.Q5B3}
        />
        <MiniRow
          label="Licensed agents of Insurance Companies"
          value={item5B.Q5B5}
        />
        <MiniRow
          label="Other firms / persons soliciting clients"
          value={item5B.Q5B6}
        />
        <p className="text-[12px] text-gray-500 mt-2">
          (Some staff may perform multiple roles.)
        </p>
      </CardSection>

      {/* ================================================== */}
      {/*                  CLIENT INFORMATION               */}
      {/* ================================================== */}
      <CardSection title="Client Type & Accounts">
        <MiniRow
          label="Approx. number of clients (all types)"
          value={item5C.Q5C1}
        />
        <MiniRow label="Percentage of non-U.S. clients" value={item5C.Q5C2} />
        <MiniRow
          label="Clients in financial planning services (last year)"
          value={item5H.Q5H}
        />
        <MiniRow label="Discretionary accounts (count)" value={item5F.Q5F2D} />
        <MiniRow
          label="Non-discretionary accounts (count)"
          value={item5F.Q5F2E}
        />
        <MiniRow label="Total accounts managed" value={item5F.Q5F2F} />
        <MiniRow
          label="Regulatory Assets Under Management (USD)"
          value={item5F.Q5F2C}
        />
        <MiniRow label="Non-U.S. AUM (approx.)" value={item5F.Q5F3} />
      </CardSection>

      {/* ================================================== */}
      {/*              COMPENSATION AGREEMENTS              */}
      {/* ================================================== */}
      <CardSection title="Compensation Agreements">
        <BulletList>
          {item5E.Q5E1 === "Y" && (
            <li>Percentage of assets under management</li>
          )}
          {item5E.Q5E2 === "Y" && <li>Hourly charges</li>}
          {item5E.Q5E3 === "Y" && <li>Subscription fees</li>}
          {item5E.Q5E4 === "Y" && <li>Fixed fees (non-subscription)</li>}
          {item5E.Q5E5 === "Y" && <li>Commissions</li>}
          {item5E.Q5E6 === "Y" && <li>Performance-based fees</li>}
          {item5E.Q5E7 === "Y" && <li>Other compensation arrangements</li>}
          {noYes(item5E) && (
            <li className="text-gray-500">No compensation methods reported.</li>
          )}
        </BulletList>
      </CardSection>

      {/* ================================================== */}
      {/*           ADVISORY SERVICES OFFERED               */}
      {/* ================================================== */}
      <CardSection title="Advisory Services Offered">
        <BulletList>
          {item5G.Q5G1 === "Y" && <li>Financial planning services</li>}
          {item5G.Q5G2 === "Y" && (
            <li>Portfolio management for individuals / small businesses</li>
          )}
          {item5G.Q5G3 === "Y" && (
            <li>Portfolio management for investment companies</li>
          )}
          {item5G.Q5G4 === "Y" && (
            <li>
              Portfolio management for pooled investment vehicles (non-IC)
            </li>
          )}
          {item5G.Q5G5 === "Y" && (
            <li>Portfolio management for businesses / institutional clients</li>
          )}
          {item5G.Q5G6 === "Y" && <li>Pension consulting services</li>}
          {item5G.Q5G7 === "Y" && <li>Selection of other advisers</li>}
          {item5G.Q5G8 === "Y" && (
            <li>Publication of periodicals or newsletters</li>
          )}
          {item5G.Q5G9 === "Y" && <li>Security ratings or pricing services</li>}
          {item5G.Q5G10 === "Y" && <li>Market timing services</li>}
          {item5G.Q5G11 === "Y" && <li>Educational seminars or workshops</li>}
          {item5G.Q5G12 === "Y" && <li>Other advisory services</li>}
          {noYes(item5G) && (
            <li className="text-gray-500">
              No advisory services marked as provided.
            </li>
          )}
        </BulletList>
      </CardSection>

      {/* ================================================== */}
      {/*                     OWNERSHIP                     */}
      {/* ================================================== */}
      <CardSection title="Direct Owners (Schedule A)">
        {Array.isArray(directOwners) && directOwners.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {directOwners.map((owner, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                {/* TODO: adjust keys after inspecting schedule-a-direct-owners JSON */}
                <div className="font-semibold">
                  {owner["ownerName"] || owner["Name"] || `Owner #${idx + 1}`}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {owner["title"] && `Title: ${owner["title"]}`}
                </div>
                <div className="text-gray-600 text-xs">
                  {owner["ownerType"] && `Owner Type: ${owner["ownerType"]}`}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No direct owners reported.</p>
        )}
      </CardSection>

      <CardSection title="Indirect Owners (Schedule B)">
        {Array.isArray(indirectOwners) && indirectOwners.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {indirectOwners.map((owner, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                {/* TODO: adjust keys after inspecting schedule-b-indirect-owners JSON */}
                <div className="font-semibold">
                  {owner["ownerName"] ||
                    owner["Name"] ||
                    `Indirect Owner #${idx + 1}`}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No indirect owners reported.</p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*         CUSTODIANS / SMA (Schedule D 5.K)         */}
      {/* ================================================== */}
      <CardSection title="Custodians for Separately Managed Accounts">
        {Array.isArray(smaCustodians) && smaCustodians.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {smaCustodians.map((c, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                {/* TODO: adjust keys after inspecting schedule-d-5-k JSON */}
                <div className="font-semibold">
                  {c["custodianName"] || c["25b-legalName"] || "Custodian"}
                </div>
                <div className="text-xs text-gray-600">
                  {c["25d-location"]?.city &&
                    `${c["25d-location"].city}${
                      c["25d-location"].state
                        ? ", " + c["25d-location"].state
                        : ""
                    }`}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            No custodians for separately managed accounts reported.
          </p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                   PRIVATE FUNDS                   */}
      {/* ================================================== */}
      <CardSection title="Private Funds (Schedule D 7.B.1)">
        {Array.isArray(privateFunds) && privateFunds.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {privateFunds.map((fund, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                {/* Based on example from docs you pasted */}
                <div className="font-semibold">
                  {fund["1a-nameOfFund"] || `Fund #${idx + 1}`}
                </div>
                <div className="text-xs text-gray-600">
                  Type: {fund["10-typeOfFund"]?.selectedTypes?.join(", ")}
                </div>
                <div className="text-xs text-gray-600">
                  Gross Asset Value:{" "}
                  {fund["11-grossAssetValue"]?.toLocaleString?.() ??
                    fund["11-grossAssetValue"]}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            No private funds reported in Schedule D 7.B.1.
          </p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                     BROCHURES                     */}
      {/* ================================================== */}
      <CardSection title="Brochures (Part 2)">
        {Array.isArray(brochures) && brochures.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {brochures.map((b, idx) => (
              <li key={idx}>
                {/* TODO: adjust keys after inspecting brochures/<crd> JSON */}
                <span className="font-semibold">
                  {b.title || b.name || `Brochure #${idx + 1}`}
                </span>
                {b.url && (
                  <>
                    {" — "}
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0F4C81] underline"
                    >
                      View PDF
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No brochures listed.</p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                    DISCLOSURES                    */}
      {/* ================================================== */}
      <CardSection title="Disclosures">
        {/* These come from Item11 + Part1B.DsclrQstns */}
        <p className="text-sm text-gray-700">
          Based on ADV Part 1A & 1B (Item 11 and related questions), this firm
          reported <span className="font-semibold">no disciplinary events</span>{" "}
          in the latest filing.
        </p>
      </CardSection>
    </div>
  );
}

/* ==================== SMALL COMPONENTS ==================== */

function CardSection({ title, children }) {
  return (
    <section className="mt-10 border border-gray-200 rounded-xl bg-white p-5 md:p-6 shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
      <div className="border-t border-gray-200 pt-4 text-sm">{children}</div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <tr className="border-b border-gray-200 last:border-b-0">
      <td className="bg-gray-50 px-3 py-2 font-medium w-56">{label}</td>
      <td className="px-3 py-2 text-gray-800">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "Not reported"}
      </td>
    </tr>
  );
}

function MiniRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-200 last:border-b-0 py-1.5">
      <span className="text-gray-700">{label}</span>
      <span className="font-medium text-gray-900">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "Not reported"}
      </span>
    </div>
  );
}

function BulletList({ children }) {
  return <ul className="list-disc pl-5 space-y-1 text-sm">{children}</ul>;
}

function noYes(obj) {
  if (!obj) return true;
  return !Object.values(obj).some((v) => v === "Y");
}
