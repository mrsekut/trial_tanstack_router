import {
	createRootRoute,
	createRoute,
	createRouter,
	Link,
	Outlet,
	RouterProvider,
} from "@tanstack/react-router";

// Root Route - ベースレイアウトとナビゲーション
const rootRoute = createRootRoute({
	component: () => (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm border-b p-4">
				<div className="max-w-4xl mx-auto flex gap-4">
					<Link
						to="/"
						className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
					>
						ホーム
					</Link>
					<Link
						to="/about"
						className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
					>
						アバウト
					</Link>
					<Link
						to="/users"
						className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
					>
						ユーザー一覧
					</Link>
				</div>
			</nav>
			<main className="max-w-4xl mx-auto p-4">
				<Outlet />
			</main>
		</div>
	),
});

// Index Route - ホームページ
const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<div className="bg-white p-6 rounded-lg shadow">
			<h1 className="text-3xl font-bold text-gray-900 mb-4">
				TanStack Router サンプル
			</h1>
			<p className="text-gray-600 mb-4">
				これはTanStack Routerの基本的な使用例です。
			</p>
			<div className="space-y-2">
				<p>• Type-safe routing</p>
				<p>• Code splitting support</p>
				<p>• Nested routing</p>
				<p>• Search params handling</p>
			</div>
		</div>
	),
});

// About Route
const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/about",
	component: () => (
		<div className="bg-white p-6 rounded-lg shadow">
			<h1 className="text-3xl font-bold text-gray-900 mb-4">アバウト</h1>
			<p className="text-gray-600">
				TanStack Routerは現代のReactアプリケーション向けの
				型安全なルーティングライブラリです。
			</p>
		</div>
	),
});

// Users Route - ユーザー一覧
const usersRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/users",
	component: () => (
		<div className="bg-white p-6 rounded-lg shadow">
			<h1 className="text-3xl font-bold text-gray-900 mb-4">ユーザー一覧</h1>
			<div className="space-y-4">
				{[
					{ id: 1, name: "田中太郎", email: "tanaka@example.com" },
					{ id: 2, name: "佐藤花子", email: "sato@example.com" },
					{ id: 3, name: "鈴木次郎", email: "suzuki@example.com" },
				].map((user) => (
					<div key={user.id} className="border p-4 rounded">
						<h3 className="font-semibold">{user.name}</h3>
						<p className="text-gray-600">{user.email}</p>
						<Link
							to="/users/$userId"
							params={{ userId: user.id.toString() }}
							className="text-blue-600 hover:underline"
						>
							詳細を見る
						</Link>
					</div>
				))}
			</div>
		</div>
	),
});

// User Detail Route - パラメータを使用
const userDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/users/$userId",
	component: () => {
		const { userId } = userDetailRoute.useParams();
		const users = {
			"1": { name: "田中太郎", email: "tanaka@example.com", bio: "エンジニア" },
			"2": { name: "佐藤花子", email: "sato@example.com", bio: "デザイナー" },
			"3": {
				name: "鈴木次郎",
				email: "suzuki@example.com",
				bio: "プロダクトマネージャー",
			},
		};

		const user = users[userId as keyof typeof users];

		if (!user) {
			return <div className="text-red-600">ユーザーが見つかりません</div>;
		}

		return (
			<div className="bg-white p-6 rounded-lg shadow">
				<div className="mb-4">
					<Link to="/users" className="text-blue-600 hover:underline">
						← ユーザー一覧に戻る
					</Link>
				</div>
				<h1 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h1>
				<div className="space-y-2">
					<p>
						<strong>メール:</strong> {user.email}
					</p>
					<p>
						<strong>職業:</strong> {user.bio}
					</p>
					<p>
						<strong>ユーザーID:</strong> {userId}
					</p>
				</div>
			</div>
		);
	},
});

// ルートツリーを作成
const routeTree = rootRoute.addChildren([
	indexRoute,
	aboutRoute,
	usersRoute,
	userDetailRoute,
]);

// ルーターを作成
const router = createRouter({ routeTree });

// 型宣言（TypeScript用）
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// RouterAppコンポーネント
export function RouterApp() {
	return <RouterProvider router={router} />;
}
