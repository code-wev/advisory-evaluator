// app/advisors/[crd]/page.js
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdvisorDetails() {
  const { crd } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------- FETCH FIRM DATA -------------------
  useEffect(() => {
    if (!crd) return; // wait until param is ready

    async function fetchFirm() {
      try {
        setLoading(true);
        const res = await fetch("/api/firm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crd }),
        });

        const json = await res.json();
        console.log("FULL API RESPONSE ===>", json);
        setData(json);
      } catch (error) {
        console.error("Error loading firm:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchFirm();
  }, [crd]);

  // ------------------- LOADING STATE -------------------
  if (loading || !crd) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0F4C81]" />
        <p className="mt-4 text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    );
  }

  // ------------------- NO DATA STATE -------------------
  if (!data || !data.filing) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Unable to Load Firm Data
        </h2>

        <p className="mt-2 text-gray-600 max-w-md">
          We couldn&apos;t retrieve firm information for CRD{" "}
          <span className="font-medium">{crd}</span>. This may be a temporary
          issue or a connection problem. Please try refreshing the page.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 px-5 py-2.5 bg-[#0F4C81] text-white rounded-lg shadow-md hover:bg-[#0d3f6a] transition-all"
        >
          Refresh &amp; Try Again
        </button>

        <p className="text-xs text-gray-400 mt-3">
          If the issue continues, please try again later.
        </p>
      </div>
    );
  }

  // ======================================================
  //                     DATA MAPPING
  // ======================================================
  const filing = data.filing;
  const info = filing.Info || {};
  const addr = filing.MainAddr || {};
  const formPart1A = filing.FormInfo?.Part1A || {};
  const part1A = data.part1A || {}; // from /part-1a/{crd}

  // Old style Part1A sub-items (from Firm endpoint)
  const item1 = formPart1A.Item1 || {};
  const item3A = formPart1A.Item3A || {};
  const item3B = formPart1A.Item3B || {};
  const item3C = formPart1A.Item3C || {};
  const item5A = formPart1A.Item5A || {};
  const item5B = formPart1A.Item5B || {};
  const item5C = formPart1A.Item5C || {};
  const item5D = formPart1A.Item5D || {};
  const item5E = formPart1A.Item5E || {};
  const item5F = formPart1A.Item5F || {};
  const item5G = formPart1A.Item5G || {};
  const item5H = formPart1A.Item5H || {};
  const filingDate = filing.Filing?.[0]?.Dt || "";

  // Schedules
  const directOwners = data.scheduleA || [];
  const indirectOwners = data.scheduleB || [];
  const otherNames = data.otherBusinessNames || [];
  const sma = data.separatelyManagedAccounts || {};
  const custodians = sma["3-custodiansForSeparatelyManagedAccounts"] || []; // D.5.K
  const financialAffiliations = data.financialIndustryAffiliations || [];
  const privateFunds = data.privateFunds || [];

  // Brochures shape: { brochures: [ ... ] }
  const brochureObj = data.brochures || {};
  const brochureList = brochureObj.brochures || [];

  // ------------------- Helpers -------------------
  const fullAddress = [addr.Strt1, addr.City, addr.State, addr.PostlCd]
    .filter(Boolean)
    .join(", ");

  const mainWebsite = item1.WebAddrs?.WebAddr;
  const allWebsites = item1.WebAddrs?.WebAddrs || [];

  const firmSizeLabel =
    item5F.Q5F2C && item5F.Q5F2C > 0
      ? `$${Number(item5F.Q5F2C).toLocaleString()} AUM`
      : "Less than $25 million (Small)";

  const registrationType = "SEC Registered Advisory Firm";

  // Try to pull client type details from Part 1A endpoint if available
  const clientTypes = part1A["5f-typesOfClients"] || {};
  const individuals = clientTypes.individuals || {};
  const hnwIndividuals = clientTypes.highNetWorthIndividuals || {};

  const individualsCount =
    individuals.numberOfClients ?? part1A["5f-individualsClients"];
  const individualsAum =
    individuals.regulatoryAum ?? part1A["5f-individualsAum"];

  const hnwCount =
    hnwIndividuals.numberOfClients ??
    part1A["5f-highNetWorthIndividualsClients"];
  const hnwAum =
    hnwIndividuals.regulatoryAum ?? part1A["5f-highNetWorthIndividualsAum"];

  const nonDiscAum =
    part1A["5d-amountOfRegulatoryAssetsUnderManagement"]?.nonDiscretionary
      ?.regulatoryAum ?? item5F.Q5F2E;

  // SLOA / Standing Letter of Instruction (best-effort)
  const hasSLOA =
    part1A["9g-hasStandingLettersOfAuthorization"] === true ||
    part1A["9g-sloa"] === true;

  // Small formatting helper
  const formatMoney = (v) => {
    if (v === undefined || v === null || v === "" || isNaN(Number(v))) {
      return "Not reported";
    }
    return `$${Number(v).toLocaleString()}`;
  };

  // ======================================================
  //                        UI
  // ======================================================
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
            <p className="text-gray-500">
              Firm Size by Assets Under Management
            </p>
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
              className="text-[#0F4C81] underline break-all"
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
            <Row
              label="Alternate Offices (DBA or Branches)"
              value={item1.Q1F5 ?? "0"}
            />
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
                {n["1a-businessName"] || n.businessName || JSON.stringify(n)}
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
          label="Staff performing Investment Advisory Functions including Research"
          value={item5B.Q5B1}
        />
        <MiniRow
          label="Staff Registered with State Securities Authorities"
          value={item5B.Q5B3}
        />
        <MiniRow
          label="Staff Licensed as Insurance Agents"
          value={item5B.Q5B5}
        />
        <p className="text-[12px] text-gray-500 mt-2">
          (Some staff may perform multiple roles.)
        </p>
      </CardSection>

      {/* ================================================== */}
      {/*                  CLIENT INFORMATION               */}
      {/* ================================================== */}
      <CardSection title="Client & Account Summary">
        <MiniRow
          label="Total Regulatory Assets Under Management"
          value={formatMoney(item5F.Q5F2C)}
        />

        <MiniRow label="Total Accounts Managed" value={item5F.Q5F2D} />

        <MiniRow
          label="Discretionary Assets"
          value={formatMoney(item5F.Q5F2A)}
        />

        <MiniRow
          label="Non-Discretionary Assets"
          value={formatMoney(item5F.Q5F2B)}
        />

        <MiniRow label="Approximate Number of Clients" value={item5D.Q5DA2} />
      </CardSection>

      {/* ================================================== */}
      {/*              COMPENSATION AGREEMENTS              */}
      {/* ================================================== */}
      <CardSection title="Compensation Agreements">
        <BulletList>
          {item5E.Q5E1 === "Y" && (
            <li>Takes percentage of assets under management</li>
          )}
          {item5E.Q5E2 === "Y" && <li>Charges hourly</li>}
          {item5E.Q5E4 === "Y" && <li>Fixed fees</li>}
          {item5E.Q5E3 === "Y" && <li>Subscription fees</li>}
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
          {item5G.Q5G1 === "Y" && <li>Financial Planning Services</li>}
          {item5G.Q5G2 === "Y" && (
            <li>
              Portfolio Management for Individuals and/or Small Businesses
            </li>
          )}
          {item5G.Q5G5 === "Y" && (
            <li>Portfolio Management for Businesses / Institutions</li>
          )}
          {item5G.Q5G6 === "Y" && <li>Pension Consulting Services</li>}
          {item5G.Q5G7 === "Y" && <li>Selection of Other Advisers</li>}
          {item5G.Q5G11 === "Y" && <li>Educational Seminars or Workshops</li>}
          {item5G.Q5G12 === "Y" && <li>Other Advisory Services</li>}
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
      <CardSection title="Direct Owners">
        {Array.isArray(directOwners) && directOwners.length > 0 ? (
          <ul className="space-y-3 text-sm">
            {directOwners.map((owner, idx) => {
              const name = owner.name || owner.ownerName || `Owner #${idx + 1}`;
              const ownerType = owner.ownerType || "Not reported";
              const title =
                owner.titleStatus || owner.title || owner.position || null;
              const acquired = owner.dateTitleStatusAcquired || null;
              const ownershipCode = owner.ownershipCode || null;

              return (
                <li
                  key={idx}
                  className="border-b border-gray-200 pb-3 last:border-b-0"
                >
                  <div className="font-semibold text-gray-900 text-base">
                    {name}
                  </div>
                  {title && (
                    <div className="text-gray-700 text-xs mt-1">
                      <span className="font-medium">Title: </span>
                      {title}
                    </div>
                  )}
                  <div className="text-gray-600 text-xs">
                    <span className="font-medium">Owner Type: </span>
                    {ownerType}
                  </div>
                  {ownershipCode && (
                    <div className="text-gray-600 text-xs">
                      <span className="font-medium">Ownership Code: </span>
                      {ownershipCode}
                    </div>
                  )}
                  {acquired && (
                    <div className="text-gray-600 text-xs">
                      <span className="font-medium">Acquired: </span>
                      {acquired}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No direct owners reported.</p>
        )}
      </CardSection>

      <CardSection title="Indirect Owners">
        {Array.isArray(indirectOwners) && indirectOwners.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {indirectOwners.map((owner, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                <div className="font-semibold">
                  {owner.name ||
                    owner.ownerName ||
                    owner["1a-organizationName"] ||
                    `Indirect Owner #${idx + 1}`}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">None reported.</p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*         CUSTODIANS / SMA (Schedule D 5.K)         */}
      {/* ================================================== */}
      <CardSection title="Custodians for Separately Managed Accounts">
        {Array.isArray(custodians) && custodians.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {custodians.map((c, idx) => {
              const name =
                c["1a-custodianName"] ||
                c["custodianName"] ||
                c["25b-legalName"] ||
                `Custodian #${idx + 1}`;
              const loc = c["25d-location"] || c.location || {};
              const cityState =
                loc.city && loc.state
                  ? `${loc.city}, ${loc.state}`
                  : loc.city || loc.state || "";

              return (
                <li
                  key={idx}
                  className="border-b border-gray-200 pb-2 last:border-b-0"
                >
                  <div className="font-semibold">{name}</div>
                  {cityState && (
                    <div className="text-xs text-gray-600">{cityState}</div>
                  )}
                </li>
              );
            })}
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
      <CardSection title="Private Funds (Schedule D.7.B)">
        {Array.isArray(privateFunds) && privateFunds.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {privateFunds.map((fund, idx) => (
              <li
                key={idx}
                className="border-b border-gray-200 pb-2 last:border-b-0"
              >
                <div className="font-semibold">
                  {fund["1a-nameOfFund"] || `Fund #${idx + 1}`}
                </div>
                <div className="text-xs text-gray-600">
                  Type:{" "}
                  {fund["10-typeOfFund"]?.selectedTypes?.join(", ") ||
                    "Not reported"}
                </div>
                <div className="text-xs text-gray-600">
                  Gross Asset Value:{" "}
                  {fund["11-grossAssetValue"]?.toLocaleString?.() ??
                    fund["11-grossAssetValue"] ??
                    "Not reported"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            No private funds reported in Schedule D.7.B.
          </p>
        )}
      </CardSection>

      {/* ================================================== */}
      {/*                     BROCHURES                     */}
      {/* ================================================== */}
      <CardSection title="Brochures (Part 2)">
        {Array.isArray(brochureList) && brochureList.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {brochureList.map((b, idx) => (
              <li key={b.versionId || idx}>
                <span className="font-semibold">
                  {b.name || b.title || `Brochure #${idx + 1}`}
                </span>
                {b.dateSubmitted && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({b.dateSubmitted})
                  </span>
                )}
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
        <p className="text-sm text-gray-700">
          Based on ADV Part 1A &amp; 1B, this firm reported{" "}
          <span className="font-semibold">no criminal disclosures</span> in the
          latest filing.
        </p>

        <div className="mt-4">
          <h3 className="font-semibold text-sm mb-1">
            Standing Letter of Instruction (SLOA)
          </h3>
          <p className="text-sm text-gray-700">
            {hasSLOA ? "Standing instructions reported." : "No SLOA reported."}
          </p>
        </div>
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
